package main

import (
	"bufio"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"
)

var (
	action string

	cmds []string
)

const (
	projects = "https://projects.apache.org/json/foundation/projects.json"

	Create  = "create"
	Sed     = "sed"
	Package = "package"
)

type Detail struct {
	BugDatabase string `json:"bug-database"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Result map[string]*Detail

func init() {
	flag.StringVar(&action, "act", "", "act")
	log.SetFlags(log.Llongfile | log.Ltime)
}

func main() {
	flag.Parse()

	if action != Create &&
		action != Sed &&
		action != Package {
		fmt.Println("need -act.\nlike: -act=create, -act=sed, -act=package!!!")
		return
	}

	resp, err := http.Get(projects)
	if err != nil {
		log.Printf("failed to http.Get url: %s err: %v", projects, err)
		return
	}

	defer func() {
		resp.Body.Close()
	}()

	bs, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("failed to ioutil.ReadAll url: %s err: %v", projects, err)
		return
	}

	var result Result

	if err := json.Unmarshal(bs, &result); err != nil {
		log.Printf("failed to json.Unmarshal url: %s err: %v", projects, err)
		return
	}

	names := make(map[string]struct{})
	desc := ""
	for k, v := range result {
		names[k] = struct{}{}

		// log.Printf("k: %+v", k)
		kk := strings.Replace(k, "_", "-", -1)
		kk = strings.Replace(kk, "+", "p", -1)

		// log.Printf("kk: %+v", kk)

		// execCmd(kk)

		p := kk
		switch action {
		case Create:
			helmCreate(p)
		case Sed:
			desc = ""
			desc = v.Description
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

			commands := sed(p, desc)
			cmds = append(cmds, commands...)
		case Package:
			helmPackage(p)
		}
	}

	if action == Sed {
		genMakefile()
	}

	log.Printf("names: %+v", len(names))
	// log.Printf("names: %+v", names)

}

// helm create
func helmCreate(p string) {
	cmd := exec.Command("helm", "create", p)
	if err := cmd.Run(); err != nil {
		log.Printf("failed to exec.Command err: %v", err)
		return
	}
	log.Println("exec.Command helm create")
}

// sed -i ''  's/!/./g' test.txt
func sed(p, desc string) (commands []string) {
	// repository
	{
		cmd := exec.Command(`sed`,
			`-i`,
			`''`,
			`'s/repository:\ nginx/repository:\ registry-edge.cosmoplat.com\/nginx\/nginx/g'`,
			p+"/values.yaml")
		cmdStr := cmd.String()
		log.Printf("cmd: %s", cmdStr)
		commands = append(commands, cmdStr)
		if err := cmd.Run(); err != nil {
			log.Printf("failed to sed err: %v", err)
			// return
		} else {
			log.Println("exec.Command sed")

		}
	}
	// tag
	{
		cmd := exec.Command(`sed`,
			`-i`,
			`''`,
			`'s/tag: ""/tag: "v0.1.1"/g'`,
			p+"/values.yaml")
		cmdStr := cmd.String()
		log.Printf("cmd: %s", cmdStr)
		commands = append(commands, cmdStr)
		if err := cmd.Run(); err != nil {
			log.Printf("failed to sed err: %v", err)
			// return
		} else {
			log.Println("exec.Command sed")
		}
	}
	// description
	{
		cmd := exec.Command(`sed`,
			`-i`,
			`''`,
			`'s/description: A Helm chart for Kubernetes/description: `+desc+`/g'`,
			p+"/Chart.yaml")
		cmdStr := cmd.String()
		log.Printf("cmd: %s", cmdStr)
		commands = append(commands, cmdStr)
		if err := cmd.Run(); err != nil {
			log.Printf("failed to sed err: %v", err)
			// return
		} else {
			log.Println("exec.Command sed")
		}
	}

	return
}

func genMakefile() {
	fi, err := os.Create("Makefile")
	if err != nil {
		log.Printf("failed to os.Create Makefile err: %v", err)
		return
	}

	w := bufio.NewWriter(fi)
	w.WriteString("sed:\n")
	for _, cmd := range cmds {
		w.WriteString("\t")
		if _, err := w.WriteString(cmd); err != nil {
			log.Printf("failed to write string cmd: %s err: %v", cmd, err)
		}
		if _, err := w.WriteString("\n"); err != nil {
			log.Printf("failed to write \\n cmd: %s err: %v", cmd, err)
		}
	}
	w.Flush()
}

// helm package
func helmPackage(p string) {
	cmd := exec.Command("helm", "package", p)
	if err := cmd.Run(); err != nil {
		log.Printf("failed to exec.Command %s err: %v", cmd.String(), err)
		return
	}
	log.Println("exec.Command helm package")
}