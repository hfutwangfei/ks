INSERT INTO sys_user
(id, code, login_name, realname, password, company_id, user_type, mobile, email, sex, state, deleted, create_by, create_time, update_by, update_time)
VALUES(1, '057c1d58-41a0-4c8a-850a-de1d3d755136', 'admin', 'admin平台管理员用户', '17d18b38cd1b5c8dc41bd10bebfdc7bd', 1, 0, '18312341234', '18312341234@163.com', 0, 0, 0, '057c1d58-41a0-4c8a-850a-de1d3d755136', '2022-06-06 16:58:50', '057c1d58-41a0-4c8a-850a-de1d3d755136', '2022-09-05 13:38:41');

INSERT INTO base_system
(id, code, system_name, state, jump_type, registration_message, document_address, video_address, domain_name)
VALUES(1, '8725cbd4-2a88-4d55-b2e5-50552d2c4d3', 'IoT-Plat', 0, 0, NULL, 'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/卡奥斯物联网平台2022725377761765349-2620.docx', 'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/iot-2022725404314148122-2621.mp4', 'http://10.206.73.136:31950');

INSERT INTO base_system
(id, code, system_name, state, jump_type, registration_message, document_address, video_address, domain_name)
VALUES(2, 'dc6be68a-fda6-4f89-9fcf-9e3abaed22fc', 'DT-Studio', 0, 1, 'DTStudioSoft://', NULL, NULL, 'http://10.206.73.136:32164');

INSERT INTO sys_company
(id, code, iot_code, company_name, company_address, state, create_by, create_time, update_by, update_time)
VALUES(1, '5696175f-c7cd-4adf-b90c-421f1f01f63e', NULL, '平台', '123456', 0, 'de1d3d755136', '2022-06-06 16:58:50', NULL, '2022-06-17 11:28:11');
