package main

import (
	"bufio"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"sort"
	"strings"
)

const (
	projectDir  = "project"
	projectsUrl = "https://projects.apache.org/json/foundation/projects.json"
)

type Detail struct {
	BugDatabase string `json:"bug-database"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Result map[string]*Detail

type Command struct {
	Project string
	Create  string
	Seds    []string
	Package string
}

func main() {
	flag.Parse()

	// 1. get project info
	result := getProjects()

	nameSlice := []string{}
	for k := range result {
		nameSlice = append(nameSlice, k)
	}

	sort.Strings(nameSlice)

	var allCmds [][]string

	// 2. get commands

	if _, err := os.Stat(projectDir); err != nil {
		if os.IsNotExist(err) {
			err := os.MkdirAll(projectDir, 0777)
			if err != nil {
				fmt.Printf("failed to create director %s err: %v", projectDir, err)
				return
			}
		}
	}

	commands := make([]*Command, 0, len(nameSlice))

	for _, k := range nameSlice {
		kk := strings.Replace(k, "_", "-", -1)
		kk = strings.Replace(kk, "+", "p", -1)

		p := kk

		//all commands
		command := &Command{
			Project: p,
		}
		commands = append(commands, command)

		var cmds []string
		create := fmt.Sprintf("helm create %s", p)
		cmds = append(cmds, create)
		command.Create = create

		desc := result[k].Description
		desc = strings.ReplaceAll(desc, "\n      ", " ")
		desc = strings.ReplaceAll(desc, "\n", " ")
		desc = strings.ReplaceAll(desc, "'", "")
		desc = strings.ReplaceAll(desc, "/", "")
		desc = strings.ReplaceAll(desc, ":", "--")
		desc = strings.ReplaceAll(desc, "&", " and ")
		if len(desc) > 400 {
			desc = desc[:400]
			desc += "..."
		}

		seds := genSeds(p, desc)
		cmds = append(cmds, seds...)
		command.Seds = seds
		pack := fmt.Sprintf("helm package %s", p)
		cmds = append(cmds, pack)
		command.Package = pack
		allCmds = append(allCmds, cmds)

	}

	// 3. generate Makefile
	makefile(projectDir, commands)

}

func getProjects() (result Result) {
	resp, err := http.Get(projectsUrl)
	if err != nil {
		fmt.Printf("failed to http.Get url: %s err: %v", projectsUrl, err)
		return
	}

	defer func() {
		_ = resp.Body.Close()
	}()

	bs, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("failed to ioutil.ReadAll url: %s err: %v", projectsUrl, err)
		return
	}

	if err := json.Unmarshal(bs, &result); err != nil {
		fmt.Printf("failed to json.Unmarshal url: %s err: %v", projectsUrl, err)
		return
	}

	return
}

var (
	sedRepositoryTemplate  = `sed -i '' 's/repository:\ nginx/repository:\ registry-edge.cosmoplat.com\/nginx\/nginx/g' %s/values.yaml`
	sedTagTemplate         = `sed -i '' 's/tag: ""/tag: "v0.1.1"/g' %s/values.yaml`
	sedDescriptionTemplate = `sed -i '' 's/description: A Helm chart for Kubernetes/description: %s/g' %s/Chart.yaml`
)

func genSeds(p, desc string) (commands []string) {
	// repository
	sedRepository := fmt.Sprintf(sedRepositoryTemplate, p)
	commands = append(commands, sedRepository)
	// tag
	sedTag := fmt.Sprintf(sedTagTemplate, p)
	commands = append(commands, sedTag)
	// description
	sedDescription := fmt.Sprintf(sedDescriptionTemplate, desc, p)
	commands = append(commands, sedDescription)

	return
}

func makefile(dir string, commands []*Command) {
	filename := path.Join(dir, "Makefile")
	fi, err := os.Create(filename)
	if err != nil {
		fmt.Printf("failed to os.Create Makefile err: %v", err)
		return
	}

	w := bufio.NewWriter(fi)

	projectNames := make([]string, 0, len(commands))
	for _, command := range commands {
		projectNames = append(projectNames, command.Project)

		//create
		create := fmt.Sprintf("create-%s", command.Project)
		_, _ = w.WriteString(create)
		_, _ = w.WriteString(":\n")
		_, _ = w.WriteString(fmt.Sprintf("\t@%s\n", command.Create))
		_, _ = w.WriteString("\n")
		//sed
		seds := fmt.Sprintf("sed-%s", command.Project)
		_, _ = w.WriteString(seds)
		_, _ = w.WriteString(":\n")
		for _, sed := range command.Seds {
			_, _ = w.WriteString(fmt.Sprintf("\t@%s\n", sed))
		}
		_, _ = w.WriteString("\n")
		//pack
		pack := fmt.Sprintf("pack-%s", command.Project)
		_, _ = w.WriteString(pack)
		_, _ = w.WriteString(":\n")
		_, _ = w.WriteString(fmt.Sprintf("\t@%s\n", command.Package))
		_, _ = w.WriteString("\n")

		_, _ = w.WriteString(fmt.Sprintf("%s: %s %s %s\n\n", command.Project, create, seds, pack))

	}

	_, _ = w.WriteString(fmt.Sprintf("start: %s\n", strings.Join(projectNames, " ")))

	_ = w.Flush()
}
