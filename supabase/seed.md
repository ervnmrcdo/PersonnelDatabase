SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict ZzLQ9kjLsmpKfMZgnkqZj8tbHLkbahRc7lPWF5GCd58QNrZIL14TAVMRwvixSI9

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '75196e86-2247-42ab-8e85-e41e15c963e2', 'authenticated', 'admin', 'test@example.com', '$2a$06$lMCNmktntI0rMR25gClDLOmQcBZYQGzcnA07QYJN3D3jJ/VSmDXUm', '2026-01-28 15:06:15.625273+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-28 15:06:15.625273+00', '2026-01-28 15:06:15.625273+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '67bb171f-27c4-444e-ba54-a6fe564b438f', 'authenticated', 'authenticated', 'testadmin@gmail.com', '$2a$10$RK3NkbnPzIc2VMYtj0mK6ecMtFa2mOOBQq1QGM8AC688/5aLt6AO2', '2026-03-03 04:24:30.448445+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-03-03 15:07:06.642824+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "67bb171f-27c4-444e-ba54-a6fe564b438f", "email": "testadmin@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-03-03 04:24:30.411329+00', '2026-03-03 15:07:06.659231+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'af248ab4-2326-47b4-80df-a99500a3bb2c', 'authenticated', 'authenticated', 'nonteaching1@gmail.com', '$2a$10$xdEfp8GJ.vIDTHDPaLxEBelCfyTqDOFA/ilN1rQkeJampbLBQTdg2', '2026-01-28 15:08:27.889708+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-01-28 15:08:27.893855+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "af248ab4-2326-47b4-80df-a99500a3bb2c", "email": "nonteaching1@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-01-28 15:08:27.882753+00', '2026-01-29 02:51:42.06499+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'd0ed4da3-2fc7-444f-bc85-2bb3c833e82c', 'authenticated', 'authenticated', 'admin@example.com', '$2a$10$FqUPnV0djyRdHx3ub5IW3O6P7xhe8ap6j.5iSHUa6stuN/5hfb0yS', '2026-01-28 15:06:50.359328+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-01-28 15:07:04.515153+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d0ed4da3-2fc7-444f-bc85-2bb3c833e82c", "email": "admin@example.com", "email_verified": true, "phone_verified": false}', NULL, '2026-01-28 15:06:50.33312+00', '2026-01-28 15:07:04.519885+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '762e5b8a-0bcf-4f2f-8e54-c98422a12875', 'authenticated', 'authenticated', 'marco@gmail.com', '$2a$10$1kTd6HSdhzSczRAjx1nMVOL/4MPYHl926zjSYSlbH8fDT9rcwqyom', '2026-02-12 16:06:14.359042+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-12 16:35:57.340404+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "762e5b8a-0bcf-4f2f-8e54-c98422a12875", "email": "marco@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-12 16:06:14.276399+00', '2026-02-12 16:35:57.342755+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '5b031afe-bd0a-444f-9d65-773989cecfda', 'authenticated', 'authenticated', 'test2@gmail.com', '$2a$10$HLjgAmNQwdBk5FlQxFIcLeWJy9x5aRM.d.DqbgUtf323SJNIX/uXG', '2026-02-02 13:06:51.466546+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-03-19 02:58:09.143864+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "5b031afe-bd0a-444f-9d65-773989cecfda", "email": "test2@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-02 13:06:51.428613+00', '2026-03-22 05:25:09.863916+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'b704b4c6-fb99-411c-9f8e-eac0dcb90381', 'authenticated', 'authenticated', 'testfaculty1@gmail.com', '$2a$10$3SRLthV4K220LIOpvRcRQe34elPEWxKhb3.CwQ9mHeCt7Xnx3Q/Uq', '2026-03-03 04:17:54.313861+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-03-03 15:22:37.12456+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "b704b4c6-fb99-411c-9f8e-eac0dcb90381", "email": "testfaculty1@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-03-03 04:17:54.288335+00', '2026-03-03 15:22:37.128757+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '8698372c-ab70-44e3-8658-9ace4293aa83', 'authenticated', 'authenticated', 'test3@gmail.com', '$2a$10$GZGvlVodPH1.S3faKHdOUuwDsALk97a0LikmTpEWX8XCQ2z95pOS.', '2026-02-02 13:10:31.994333+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-03-22 15:55:11.503253+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "8698372c-ab70-44e3-8658-9ace4293aa83", "email": "test3@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-02 13:10:31.985258+00', '2026-03-23 11:41:22.154335+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'f43c1041-48db-4c6e-b1e1-0edceb458328', 'authenticated', 'authenticated', 'test1@gmail.com', '$2a$10$7XRG/YVOfUg5oc.W6T4tfuiODxs/cfOBeT3szT6YA2XTUrur0LPQ2', '2026-01-29 02:53:39.370495+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-03-18 15:27:27.830396+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "f43c1041-48db-4c6e-b1e1-0edceb458328", "email": "test1@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-01-29 02:53:39.341894+00', '2026-03-18 15:27:27.834546+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6ab06c5a-f4a0-477c-8e98-b10d6d5865ed', 'authenticated', 'authenticated', 'testfaculty2@gmail.com', '$2a$10$0lPh6DTg5HOHLD/.Zh.RleAzu69lI7Piat971IlgdVGKSuR./DTL6', '2026-03-03 04:20:23.11111+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-03-03 04:20:23.114609+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "6ab06c5a-f4a0-477c-8e98-b10d6d5865ed", "email": "testfaculty2@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-03-03 04:20:23.095138+00', '2026-03-03 04:20:23.118287+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('d0ed4da3-2fc7-444f-bc85-2bb3c833e82c', 'd0ed4da3-2fc7-444f-bc85-2bb3c833e82c', '{"sub": "d0ed4da3-2fc7-444f-bc85-2bb3c833e82c", "email": "admin@example.com", "email_verified": false, "phone_verified": false}', 'email', '2026-01-28 15:06:50.353664+00', '2026-01-28 15:06:50.353732+00', '2026-01-28 15:06:50.353732+00', 'd7ed7e17-0e24-4b48-b0d1-1d5a671674fc'),
	('af248ab4-2326-47b4-80df-a99500a3bb2c', 'af248ab4-2326-47b4-80df-a99500a3bb2c', '{"sub": "af248ab4-2326-47b4-80df-a99500a3bb2c", "email": "nonteaching1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-01-28 15:08:27.887046+00', '2026-01-28 15:08:27.887091+00', '2026-01-28 15:08:27.887091+00', 'eae9dfa0-97b1-4b44-a27e-c8ec86e7bc69'),
	('f43c1041-48db-4c6e-b1e1-0edceb458328', 'f43c1041-48db-4c6e-b1e1-0edceb458328', '{"sub": "f43c1041-48db-4c6e-b1e1-0edceb458328", "email": "test1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-01-29 02:53:39.36439+00', '2026-01-29 02:53:39.364451+00', '2026-01-29 02:53:39.364451+00', 'aec15b86-b9f3-4acf-96b2-977e695311df'),
	('5b031afe-bd0a-444f-9d65-773989cecfda', '5b031afe-bd0a-444f-9d65-773989cecfda', '{"sub": "5b031afe-bd0a-444f-9d65-773989cecfda", "email": "test2@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-02-02 13:06:51.46256+00', '2026-02-02 13:06:51.462617+00', '2026-02-02 13:06:51.462617+00', '779c51c4-31de-4460-92d1-252c813a50e5'),
	('8698372c-ab70-44e3-8658-9ace4293aa83', '8698372c-ab70-44e3-8658-9ace4293aa83', '{"sub": "8698372c-ab70-44e3-8658-9ace4293aa83", "email": "test3@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-02-02 13:10:31.991642+00', '2026-02-02 13:10:31.991709+00', '2026-02-02 13:10:31.991709+00', '700145ba-9af3-42c0-9779-7501c3475566'),
	('762e5b8a-0bcf-4f2f-8e54-c98422a12875', '762e5b8a-0bcf-4f2f-8e54-c98422a12875', '{"sub": "762e5b8a-0bcf-4f2f-8e54-c98422a12875", "email": "marco@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-02-12 16:06:14.344431+00', '2026-02-12 16:06:14.345056+00', '2026-02-12 16:06:14.345056+00', '10399abb-77c6-4b30-bd3d-cf3a939aaeab'),
	('b704b4c6-fb99-411c-9f8e-eac0dcb90381', 'b704b4c6-fb99-411c-9f8e-eac0dcb90381', '{"sub": "b704b4c6-fb99-411c-9f8e-eac0dcb90381", "email": "testfaculty1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-03-03 04:17:54.308319+00', '2026-03-03 04:17:54.308372+00', '2026-03-03 04:17:54.308372+00', '8080a6a3-0c0e-402d-a451-e1374245e7c2'),
	('6ab06c5a-f4a0-477c-8e98-b10d6d5865ed', '6ab06c5a-f4a0-477c-8e98-b10d6d5865ed', '{"sub": "6ab06c5a-f4a0-477c-8e98-b10d6d5865ed", "email": "testfaculty2@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-03-03 04:20:23.106824+00', '2026-03-03 04:20:23.106874+00', '2026-03-03 04:20:23.106874+00', '4930e384-8fdd-416a-b461-b5656d3a2ce9'),
	('67bb171f-27c4-444e-ba54-a6fe564b438f', '67bb171f-27c4-444e-ba54-a6fe564b438f', '{"sub": "67bb171f-27c4-444e-ba54-a6fe564b438f", "email": "testadmin@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-03-03 04:24:30.443836+00', '2026-03-03 04:24:30.443882+00', '2026-03-03 04:24:30.443882+00', 'e6c1ae43-183b-4653-839a-f0ca54a4bba0');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('a776446e-8d47-4953-832d-b553afb26a2f', 'd0ed4da3-2fc7-444f-bc85-2bb3c833e82c', '2026-01-28 15:06:50.370289+00', '2026-01-28 15:06:50.370289+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '202.92.128.210', NULL, NULL, NULL, NULL, NULL),
	('6c789979-3fb6-4506-9096-9b073c285729', 'd0ed4da3-2fc7-444f-bc85-2bb3c833e82c', '2026-01-28 15:07:04.516432+00', '2026-01-28 15:07:04.516432+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '202.92.128.210', NULL, NULL, NULL, NULL, NULL),
	('80f3ac65-3631-4f2b-9858-fd162c6fd168', 'af248ab4-2326-47b4-80df-a99500a3bb2c', '2026-01-28 15:08:27.89395+00', '2026-01-29 02:51:42.081347+00', NULL, 'aal1', NULL, '2026-01-29 02:51:42.080507', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '202.92.128.210', NULL, NULL, NULL, NULL, NULL),
	('bb11c045-3658-48cc-a0f2-00c20bcd9158', '6ab06c5a-f4a0-477c-8e98-b10d6d5865ed', '2026-03-03 04:20:23.115366+00', '2026-03-03 04:20:23.115366+00', NULL, 'aal1', NULL, NULL, 'node', '202.92.128.217', NULL, NULL, NULL, NULL, NULL),
	('24ab266f-37ef-4987-b19e-d5699c2f0c32', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-20 15:10:26.603515+00', '2026-03-20 19:58:12.052375+00', NULL, 'aal1', NULL, '2026-03-20 19:58:12.050394', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0', '112.203.244.7', NULL, NULL, NULL, NULL, NULL),
	('7dd3e591-98c9-49b0-aaf9-bf5a37bfe64f', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-19 02:58:09.143953+00', '2026-03-22 05:25:12.366709+00', NULL, 'aal1', NULL, '2026-03-22 05:25:12.366618', 'node', '18.143.160.131', NULL, NULL, NULL, NULL, NULL),
	('003d71d8-501f-4ed2-93b0-54796b56702b', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 15:55:11.505277+00', '2026-03-23 11:41:22.164959+00', NULL, 'aal1', NULL, '2026-03-23 11:41:22.164839', 'Mozilla/5.0 (X11; Linux x86_64; rv:147.0) Gecko/20100101 Firefox/147.0', '112.203.241.26', NULL, NULL, NULL, NULL, NULL),
	('cdea04cc-9de7-43bc-91a7-e8cb5427f6bf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 07:14:08.207719+00', '2026-03-22 13:35:47.317371+00', NULL, 'aal1', NULL, '2026-03-22 13:35:47.317268', 'Mozilla/5.0 (X11; Linux x86_64; rv:147.0) Gecko/20100101 Firefox/147.0', '136.158.8.161', NULL, NULL, NULL, NULL, NULL),
	('c32bc441-2298-4b0a-9401-cea44578c67d', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 13:50:45.817052+00', '2026-03-22 13:50:45.817052+00', NULL, 'aal1', NULL, NULL, 'node', '136.158.8.161', NULL, NULL, NULL, NULL, NULL),
	('dd834016-1f2b-47d0-9ec4-59a20f4a0fbb', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 13:50:56.682809+00', '2026-03-22 13:50:56.682809+00', NULL, 'aal1', NULL, NULL, 'node', '136.158.8.161', NULL, NULL, NULL, NULL, NULL),
	('1ae08534-66d4-49de-a115-37229c66961d', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 14:03:38.864279+00', '2026-03-22 14:03:38.864279+00', NULL, 'aal1', NULL, NULL, 'node', '136.158.8.161', NULL, NULL, NULL, NULL, NULL),
	('ccf7562b-1ec1-46c1-8b4b-a3b4042e10d2', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 14:03:42.561315+00', '2026-03-22 14:03:42.561315+00', NULL, 'aal1', NULL, NULL, 'node', '136.158.8.161', NULL, NULL, NULL, NULL, NULL),
	('ac0a9e33-a259-46c3-8705-21d1cc90a87c', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 14:04:20.420895+00', '2026-03-22 15:03:21.601273+00', NULL, 'aal1', NULL, '2026-03-22 15:03:21.601163', 'Mozilla/5.0 (X11; Linux x86_64; rv:147.0) Gecko/20100101 Firefox/147.0', '136.158.8.161', NULL, NULL, NULL, NULL, NULL),
	('f8177a55-00f5-48a1-a91f-9129b20e6224', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 15:44:23.63706+00', '2026-03-22 15:44:23.63706+00', NULL, 'aal1', NULL, NULL, 'node', '136.158.8.161', NULL, NULL, NULL, NULL, NULL),
	('4b1d8a14-07b4-4f24-842b-44b2841c4743', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 15:44:27.151419+00', '2026-03-22 15:44:27.151419+00', NULL, 'aal1', NULL, NULL, 'node', '136.158.8.161', NULL, NULL, NULL, NULL, NULL),
	('86c74cfb-903b-4ca3-ba61-7fced005718a', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 15:44:27.630366+00', '2026-03-22 15:44:27.630366+00', NULL, 'aal1', NULL, NULL, 'node', '136.158.8.161', NULL, NULL, NULL, NULL, NULL),
	('4569048d-93ba-43da-bd80-562ec179a426', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-22 15:45:22.914627+00', '2026-03-22 15:45:22.914627+00', NULL, 'aal1', NULL, NULL, 'node', '136.158.8.161', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('a776446e-8d47-4953-832d-b553afb26a2f', '2026-01-28 15:06:50.399868+00', '2026-01-28 15:06:50.399868+00', 'password', '5a198b8c-17c7-46f1-a703-1afbc67d2132'),
	('6c789979-3fb6-4506-9096-9b073c285729', '2026-01-28 15:07:04.520228+00', '2026-01-28 15:07:04.520228+00', 'password', '6035dd1b-3ccd-446c-965d-e2185152bbec'),
	('80f3ac65-3631-4f2b-9858-fd162c6fd168', '2026-01-28 15:08:27.898486+00', '2026-01-28 15:08:27.898486+00', 'password', '42e9c3e0-65c4-4adc-a35f-d349aaedc9cc'),
	('7dd3e591-98c9-49b0-aaf9-bf5a37bfe64f', '2026-03-19 02:58:09.14635+00', '2026-03-19 02:58:09.14635+00', 'password', '77a10ab8-e709-4315-8edc-938b39149549'),
	('24ab266f-37ef-4987-b19e-d5699c2f0c32', '2026-03-20 15:10:26.675947+00', '2026-03-20 15:10:26.675947+00', 'password', '91ce7c0c-8a68-4e4a-8702-4efd0f57b2ea'),
	('cdea04cc-9de7-43bc-91a7-e8cb5427f6bf', '2026-03-22 07:14:08.306724+00', '2026-03-22 07:14:08.306724+00', 'password', 'ef03b99b-6dad-41eb-98a3-71b98c06f6e9'),
	('c32bc441-2298-4b0a-9401-cea44578c67d', '2026-03-22 13:50:45.870017+00', '2026-03-22 13:50:45.870017+00', 'password', 'f54f5828-21c3-4dc5-ae43-379d99fd4a43'),
	('dd834016-1f2b-47d0-9ec4-59a20f4a0fbb', '2026-03-22 13:50:56.685744+00', '2026-03-22 13:50:56.685744+00', 'password', '645f308e-7b3f-4f0b-9f3e-73575144707c'),
	('1ae08534-66d4-49de-a115-37229c66961d', '2026-03-22 14:03:38.908982+00', '2026-03-22 14:03:38.908982+00', 'password', '4d0e84d7-2142-4069-8075-6a160c2438fd'),
	('ccf7562b-1ec1-46c1-8b4b-a3b4042e10d2', '2026-03-22 14:03:42.563426+00', '2026-03-22 14:03:42.563426+00', 'password', '1dc1ff4f-58e0-4ffa-9955-cf7f11bb651a'),
	('ac0a9e33-a259-46c3-8705-21d1cc90a87c', '2026-03-22 14:04:20.506092+00', '2026-03-22 14:04:20.506092+00', 'password', '7f96199b-c7c3-444a-bf76-e02e00b99660'),
	('f8177a55-00f5-48a1-a91f-9129b20e6224', '2026-03-22 15:44:23.693659+00', '2026-03-22 15:44:23.693659+00', 'password', '46951121-dcc0-4b5d-9469-04c00b37b324'),
	('4b1d8a14-07b4-4f24-842b-44b2841c4743', '2026-03-22 15:44:27.154762+00', '2026-03-22 15:44:27.154762+00', 'password', '7b3ef2e9-5ce7-4bf0-a552-53d3371434b0'),
	('86c74cfb-903b-4ca3-ba61-7fced005718a', '2026-03-22 15:44:27.634834+00', '2026-03-22 15:44:27.634834+00', 'password', 'd1ef4a00-a4e8-4e96-ab6f-f18c2ca8aaf9'),
	('4569048d-93ba-43da-bd80-562ec179a426', '2026-03-22 15:45:22.917834+00', '2026-03-22 15:45:22.917834+00', 'password', '5ecb8848-6862-4532-940b-90114f104114'),
	('003d71d8-501f-4ed2-93b0-54796b56702b', '2026-03-22 15:55:11.557806+00', '2026-03-22 15:55:11.557806+00', 'password', 'aade2f1c-eaba-4786-b89f-1b05b110d3fa'),
	('bb11c045-3658-48cc-a0f2-00c20bcd9158', '2026-03-03 04:20:23.118779+00', '2026-03-03 04:20:23.118779+00', 'password', 'f12f043d-96a3-449a-94a2-e54d73179ff7');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 809, '2kifudpj4j3t', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-22 11:08:48.067992+00', '2026-03-22 12:35:28.200691+00', 'ei4cqca5fgxd', 'cdea04cc-9de7-43bc-91a7-e8cb5427f6bf'),
	('00000000-0000-0000-0000-000000000000', 810, 'js7gucz5jfqc', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-22 12:35:28.236791+00', '2026-03-22 13:35:47.272163+00', '2kifudpj4j3t', 'cdea04cc-9de7-43bc-91a7-e8cb5427f6bf'),
	('00000000-0000-0000-0000-000000000000', 811, 'jp6sughqn2zt', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 13:35:47.293519+00', '2026-03-22 13:35:47.293519+00', 'js7gucz5jfqc', 'cdea04cc-9de7-43bc-91a7-e8cb5427f6bf'),
	('00000000-0000-0000-0000-000000000000', 812, 'luuhsy5chvvz', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 13:50:45.846559+00', '2026-03-22 13:50:45.846559+00', NULL, 'c32bc441-2298-4b0a-9401-cea44578c67d'),
	('00000000-0000-0000-0000-000000000000', 813, 'sujjael63tov', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 13:50:56.684488+00', '2026-03-22 13:50:56.684488+00', NULL, 'dd834016-1f2b-47d0-9ec4-59a20f4a0fbb'),
	('00000000-0000-0000-0000-000000000000', 814, 'jmne7xjnuulv', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 14:03:38.887882+00', '2026-03-22 14:03:38.887882+00', NULL, '1ae08534-66d4-49de-a115-37229c66961d'),
	('00000000-0000-0000-0000-000000000000', 815, 'zybogmicizpv', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 14:03:42.562277+00', '2026-03-22 14:03:42.562277+00', NULL, 'ccf7562b-1ec1-46c1-8b4b-a3b4042e10d2'),
	('00000000-0000-0000-0000-000000000000', 9, 'q3266sdnpv6k', 'd0ed4da3-2fc7-444f-bc85-2bb3c833e82c', false, '2026-01-28 15:06:50.385734+00', '2026-01-28 15:06:50.385734+00', NULL, 'a776446e-8d47-4953-832d-b553afb26a2f'),
	('00000000-0000-0000-0000-000000000000', 10, '5lezb3fs73sl', 'd0ed4da3-2fc7-444f-bc85-2bb3c833e82c', false, '2026-01-28 15:07:04.518229+00', '2026-01-28 15:07:04.518229+00', NULL, '6c789979-3fb6-4506-9096-9b073c285729'),
	('00000000-0000-0000-0000-000000000000', 11, 'l7qtgsqrtbgk', 'af248ab4-2326-47b4-80df-a99500a3bb2c', true, '2026-01-28 15:08:27.89593+00', '2026-01-29 02:51:42.051277+00', NULL, '80f3ac65-3631-4f2b-9858-fd162c6fd168'),
	('00000000-0000-0000-0000-000000000000', 12, 'bn7y2lkhlilb', 'af248ab4-2326-47b4-80df-a99500a3bb2c', false, '2026-01-29 02:51:42.06088+00', '2026-01-29 02:51:42.06088+00', 'l7qtgsqrtbgk', '80f3ac65-3631-4f2b-9858-fd162c6fd168'),
	('00000000-0000-0000-0000-000000000000', 816, '3doo5zgrgm2d', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-22 14:04:20.470497+00', '2026-03-22 15:03:21.534558+00', NULL, 'ac0a9e33-a259-46c3-8705-21d1cc90a87c'),
	('00000000-0000-0000-0000-000000000000', 817, '4sqbc5lh2ckh', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 15:03:21.570057+00', '2026-03-22 15:03:21.570057+00', '3doo5zgrgm2d', 'ac0a9e33-a259-46c3-8705-21d1cc90a87c'),
	('00000000-0000-0000-0000-000000000000', 818, 'nh7mi5f6stia', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 15:44:23.664755+00', '2026-03-22 15:44:23.664755+00', NULL, 'f8177a55-00f5-48a1-a91f-9129b20e6224'),
	('00000000-0000-0000-0000-000000000000', 819, 'pnwpj4fmjpuc', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 15:44:27.153525+00', '2026-03-22 15:44:27.153525+00', NULL, '4b1d8a14-07b4-4f24-842b-44b2841c4743'),
	('00000000-0000-0000-0000-000000000000', 820, 'txljm7xj7qk7', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 15:44:27.63203+00', '2026-03-22 15:44:27.63203+00', NULL, '86c74cfb-903b-4ca3-ba61-7fced005718a'),
	('00000000-0000-0000-0000-000000000000', 661, 'kdu2spqvgxct', '6ab06c5a-f4a0-477c-8e98-b10d6d5865ed', false, '2026-03-03 04:20:23.117195+00', '2026-03-03 04:20:23.117195+00', NULL, 'bb11c045-3658-48cc-a0f2-00c20bcd9158'),
	('00000000-0000-0000-0000-000000000000', 821, 'eipnjjxnc55i', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-22 15:45:22.916487+00', '2026-03-22 15:45:22.916487+00', NULL, '4569048d-93ba-43da-bd80-562ec179a426'),
	('00000000-0000-0000-0000-000000000000', 822, 'pwogwis7dsuo', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-22 15:55:11.540396+00', '2026-03-22 17:06:54.049021+00', NULL, '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 823, 'uiohoj7plsny', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-22 17:06:54.07322+00', '2026-03-22 18:05:19.570505+00', 'pwogwis7dsuo', '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 824, '7gtjsipne5cj', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-22 18:05:19.595621+00', '2026-03-22 19:12:35.416957+00', 'uiohoj7plsny', '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 825, 'aojo4u3stpkl', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-22 19:12:35.449236+00', '2026-03-23 01:35:16.642297+00', '7gtjsipne5cj', '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 826, 'i37ldut73357', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-23 01:35:16.655344+00', '2026-03-23 02:34:29.582256+00', 'aojo4u3stpkl', '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 827, 'obvcxnoqzkea', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-23 02:34:29.60573+00', '2026-03-23 04:29:48.213051+00', 'i37ldut73357', '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 828, 't37isokem2pk', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-23 04:29:48.221325+00', '2026-03-23 05:36:37.330448+00', 'obvcxnoqzkea', '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 829, 'gbpopkkmbma3', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-23 05:36:37.357479+00', '2026-03-23 07:37:48.234483+00', 't37isokem2pk', '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 830, '6ut4ics4jt3r', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-23 07:37:48.268974+00', '2026-03-23 11:41:22.128813+00', 'gbpopkkmbma3', '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 831, 'lt3fr2uy6d5k', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-23 11:41:22.145241+00', '2026-03-23 11:41:22.145241+00', '6ut4ics4jt3r', '003d71d8-501f-4ed2-93b0-54796b56702b'),
	('00000000-0000-0000-0000-000000000000', 801, 'udf4pk7zporb', '5b031afe-bd0a-444f-9d65-773989cecfda', true, '2026-03-19 02:58:09.145173+00', '2026-03-20 14:19:20.441636+00', NULL, '7dd3e591-98c9-49b0-aaf9-bf5a37bfe64f'),
	('00000000-0000-0000-0000-000000000000', 803, 'dikkj2yuiipa', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-20 15:10:26.646856+00', '2026-03-20 16:08:55.864874+00', NULL, '24ab266f-37ef-4987-b19e-d5699c2f0c32'),
	('00000000-0000-0000-0000-000000000000', 804, 'i37si527gmyd', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-20 16:08:55.908023+00', '2026-03-20 19:58:11.980011+00', 'dikkj2yuiipa', '24ab266f-37ef-4987-b19e-d5699c2f0c32'),
	('00000000-0000-0000-0000-000000000000', 805, 'tkeb4d5x2nu3', '8698372c-ab70-44e3-8658-9ace4293aa83', false, '2026-03-20 19:58:12.01314+00', '2026-03-20 19:58:12.01314+00', 'i37si527gmyd', '24ab266f-37ef-4987-b19e-d5699c2f0c32'),
	('00000000-0000-0000-0000-000000000000', 802, 'ckn4w2cbhffj', '5b031afe-bd0a-444f-9d65-773989cecfda', true, '2026-03-20 14:19:20.45277+00', '2026-03-22 05:25:09.815139+00', 'udf4pk7zporb', '7dd3e591-98c9-49b0-aaf9-bf5a37bfe64f'),
	('00000000-0000-0000-0000-000000000000', 806, '655gx54nyaoo', '5b031afe-bd0a-444f-9d65-773989cecfda', false, '2026-03-22 05:25:09.842937+00', '2026-03-22 05:25:09.842937+00', 'ckn4w2cbhffj', '7dd3e591-98c9-49b0-aaf9-bf5a37bfe64f'),
	('00000000-0000-0000-0000-000000000000', 807, 'm3ozvuijfvye', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-22 07:14:08.259647+00', '2026-03-22 08:27:07.362786+00', NULL, 'cdea04cc-9de7-43bc-91a7-e8cb5427f6bf'),
	('00000000-0000-0000-0000-000000000000', 808, 'ei4cqca5fgxd', '8698372c-ab70-44e3-8658-9ace4293aa83', true, '2026-03-22 08:27:07.369371+00', '2026-03-22 11:08:48.060424+00', 'm3ozvuijfvye', 'cdea04cc-9de7-43bc-91a7-e8cb5427f6bf');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: awards; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."awards" ("award_id", "title", "description") VALUES
	(2, 'IPA Award (book)', NULL),
	(1, 'IPA Award (journal)', NULL);


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: publication_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."publication_type" ("id", "name") VALUES
	(1, 'JOURNAL'),
	(2, 'BOOK CHAPTER');


--
-- Data for Name: publications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."publications" ("publication_id", "type", "title", "publisher", "publication_status", "date_published", "issue_number", "page_numbers", "volume_number", "journal_name", "doi", "publication_type_id") VALUES
	(23, 'Book Chapter', 'test1', 'test1', 'test1', '2026-03-18', 'test1', 'test1', 'test1', 'test1', NULL, 2),
	(24, 'Book Chapter', 'heheh', 'ivan', '', '2026-03-12', '12', '30', '1', 'kaskad', 'fasfas', 2),
	(20, 'Journal', 'Classical Soundness in Robustness Diagram with Loop and Time Controls', 'Department of Science and Technology', '', '2023-12-04', '6B', '2327-2342', '152', 'Philippine Journal of Science', '', 1),
	(2, 'Book Chapter', 'Scalable Database Sharding', 'IEEE Xplore', '', '2025-01-10', 'Proc. 102', '15-22', 'N/A', 'Test', 'fkasjfaskj', 1),
	(3, 'Book Chapter', 'Ethics in Cloud Computing', 'Tech-Science Pub', 'Under Review', '2026-02-01', 'Ch. 8', '200-245', 'Ed. 1', 'Test3', NULL, 2),
	(18, 'Journal', 'Matrix Representation of Virus Machines and an application to the discrete logarithm problem', ' World Scientific', '', '2025-06-14', '', '', '', ' International Journal of Neural Systems', NULL, 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "role", "created_at", "email", "first_name", "middle_name", "last_name", "signature_path", "university", "college", "department", "contact_number", "position", "email_address") VALUES
	('b704b4c6-fb99-411c-9f8e-eac0dcb90381', 'teaching', '2026-03-03 04:17:54.288', 'testfaculty1@gmail.com', 'Richelle Ann', 'B', 'Juayong', 'b704b4c6-fb99-411c-9f8e-eac0dcb90381/b704b4c6-fb99-411c-9f8e-eac0dcb90381.png', 'UP Diliman', 'College of Engineering', 'Department of Computer Science', '09191234567', 'Associate Professor', 'testfaculty1@gmail.com'),
	('67bb171f-27c4-444e-ba54-a6fe564b438f', 'admin', '2026-03-03 04:24:30.410462', 'testadmin@gmail.com', 'John Justine', 'S', 'Villar', '67bb171f-27c4-444e-ba54-a6fe564b438f/67bb171f-27c4-444e-ba54-a6fe564b438f.png', 'UP Diliman', 'College of Engineering', 'Department of Computer Science', '09177654321', 'Professor', 'testadmin@gmail.com'),
	('8698372c-ab70-44e3-8658-9ace4293aa83', 'nonteaching', '2026-02-02 13:10:31.984907', 'test3@gmail.com', 'Francis George', 'Carreon', 'Cabarles', '8698372c-ab70-44e3-8658-9ace4293aa83/8698372c-ab70-44e3-8658-9ace4293aa83.png', 'UP Diliman', 'College of Engineering', 'Dept. of Computer Science', '(02) 8981 8500 local 3231', 'Associate Professor 6', 'test3@gmail.com'),
	('5b031afe-bd0a-444f-9d65-773989cecfda', 'admin', '2026-02-02 13:06:51.428235', 'test2@gmail.com', 'John', 'Justine', 'Villar', '5b031afe-bd0a-444f-9d65-773989cecfda/5b031afe-bd0a-444f-9d65-773989cecfda.png', NULL, NULL, NULL, NULL, NULL, 'test2@gmail.com'),
	('f43c1041-48db-4c6e-b1e1-0edceb458328', 'teaching', '2026-01-29 02:53:39.340854', 'test1@gmail.com', 'Carl', 'Johnson', 'Faculty', 'f43c1041-48db-4c6e-b1e1-0edceb458328/f43c1041-48db-4c6e-b1e1-0edceb458328.png', 'DLSU', 'COE', 'DCS', '09676767676', 'Associate Instructor', 'test1@gmail.com'),
	('6ab06c5a-f4a0-477c-8e98-b10d6d5865ed', 'teaching', '2026-03-03 04:20:23.094826', 'testfaculty2@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'testfaculty2@gmail.com');


--
-- Data for Name: publication_authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."publication_authors" ("publication_id", "user_id", "author_rank") VALUES
	(2, '8698372c-ab70-44e3-8658-9ace4293aa83', 1),
	(20, 'b704b4c6-fb99-411c-9f8e-eac0dcb90381', NULL),
	(18, '8698372c-ab70-44e3-8658-9ace4293aa83', 1),
	(23, '8698372c-ab70-44e3-8658-9ace4293aa83', 1),
	(24, '8698372c-ab70-44e3-8658-9ace4293aa83', NULL);


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."submissions" ("submission_id", "submitter_id", "award_id", "publication_id", "reviewed_by_admin_id", "date_submitted", "status", "remarks", "pdf_json_data", "logs", "form41_path") VALUES
	(39, '8698372c-ab70-44e3-8658-9ace4293aa83', 2, 2, NULL, '2026-03-18 15:07:17.376953+00', 'PENDING', NULL, '{"AHCI": false, "CPCI": false, "SCIE": false, "SSCI": false, "WSCC": false, "dost": false, "scopus": false, "upCUGrant": false, "author1Name": "Francis George Carreon, Cabarle", "author1REPS": false, "journalName": "Test", "articleTitle": "Scalable Database Sharding", "impactFactor": "", "otherFunding": false, "publisherName": "IEEE Xplore", "author1College": "College of Engineering", "author1Contact": "(02) 8981 8500 local 3231", "author1Faculty": false, "author1Student": false, "author1Position": "Associate Professor 6", "upSystemFunding": false, "author1Permanent": false, "author1Personnel": false, "author1Temporary": false, "completeCitation": "Scalable Database Sharding, Test, N/A, 15-22", "impactFactorYear": "", "author1AdminStaff": false, "author1Department": "Dept. of Computer Science", "author1University": "UP Diliman", "dateOfPublication": "2025-01-10", "totalAuthorNumber": "1", "author1EmailAddress": "test3@gmail.com", "author1UpAffiliated": false, "author1NameLastFirst": "Cabarle, Francis George, Carreon", "author1UpContractual": false, "otherFundingSpecfics": "", "author1ResearchFaculty": false, "author1NonUpContractual": false, "author1ProjectPersonnell": false, "author1UniversityAndDept": "UP Diliman/Dept. of Computer Science"}', '[{"date": "Wed Mar 18 2026 23:07:17 GMT+0800 (Philippine Standard Time)", "action": "SUBMITTED", "remarks": "", "actor_name": "test3@gmail.com"}]', '39.pdf'),
	(40, '8698372c-ab70-44e3-8658-9ace4293aa83', 2, 2, NULL, '2026-03-18 15:22:09.601833+00', 'PENDING', NULL, '{"AHCI": false, "CPCI": false, "SCIE": false, "SSCI": false, "WSCC": false, "dost": false, "scopus": false, "upCUGrant": false, "author1Name": "Francis George Carreon, Cabarle", "author1REPS": false, "journalName": "Test", "articleTitle": "Scalable Database Sharding", "impactFactor": "", "otherFunding": false, "publisherName": "IEEE Xplore", "author1College": "College of Engineering", "author1Contact": "(02) 8981 8500 local 3231", "author1Faculty": false, "author1Student": false, "author1Position": "Associate Professor 6", "upSystemFunding": false, "author1Permanent": false, "author1Personnel": false, "author1Temporary": false, "completeCitation": "Scalable Database Sharding, Test, N/A, 15-22", "impactFactorYear": "", "author1AdminStaff": false, "author1Department": "Dept. of Computer Science", "author1University": "UP Diliman", "dateOfPublication": "2025-01-10", "totalAuthorNumber": "1", "author1EmailAddress": "test3@gmail.com", "author1UpAffiliated": false, "author1NameLastFirst": "Cabarle, Francis George, Carreon", "author1UpContractual": false, "otherFundingSpecfics": "", "author1ResearchFaculty": false, "author1NonUpContractual": false, "author1ProjectPersonnell": false, "author1UniversityAndDept": "UP Diliman/Dept. of Computer Science"}', '[{"date": "Wed Mar 18 2026 23:22:09 GMT+0800 (Philippine Standard Time)", "action": "SUBMITTED", "remarks": "", "actor_name": "test3@gmail.com"}]', '40.pdf'),
	(41, '8698372c-ab70-44e3-8658-9ace4293aa83', 1, 18, '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-19 02:48:01.19646+00', 'PENDING', 'Incorrect dates', '"{\"AHCI\":true,\"CPCI\":false,\"SCIE\":false,\"SSCI\":false,\"WSCC\":false,\"dost\":false,\"scopus\":false,\"upCUGrant\":true,\"author1Name\":\"Francis George Carreon, Cabarles\",\"author1REPS\":false,\"journalName\":\" International Journal of Neural Systems\",\"articleTitle\":\"Matrix Representation of Virus Machines and an application to the discrete logarithm problem\",\"impactFactor\":\"2021\",\"otherFunding\":false,\"publisherName\":\" World Scientific\",\"author1College\":\"College of Engineering\",\"author1Contact\":\"(02) 8981 8500 local 3231\",\"author1Faculty\":true,\"author1Student\":false,\"author1Position\":\"Associate Professor 6\",\"upSystemFunding\":false,\"author1Permanent\":false,\"author1Personnel\":true,\"author1Temporary\":true,\"completeCitation\":\"Matrix Representation of Virus Machines and an application to the discrete logarithm problem,  International Journal of Neural Systems, , \",\"impactFactorYear\":\"2020\",\"author1AdminStaff\":false,\"author1Department\":\"Dept. of Computer Science\",\"author1University\":\"UP Diliman\",\"dateOfPublication\":\"2025-06-14\",\"totalAuthorNumber\":\"1\",\"author1EmailAddress\":\"test3@gmail.com\",\"author1UpAffiliated\":false,\"author1NameLastFirst\":\"Cabarles, Francis George, Carreon\",\"author1UpContractual\":false,\"otherFundingSpecfics\":\"\",\"author1ResearchFaculty\":false,\"author1NonUpContractual\":false,\"author1ProjectPersonnell\":false,\"author1UniversityAndDept\":\"UP Diliman/Dept. of Computer Science\"}"', '[{"date": "Thu Mar 19 2026 10:48:01 GMT+0800 (Singapore Standard Time)", "action": "SUBMITTED", "remarks": "", "actor_name": "Francis George Cabarle"}, {"date": "2026-03-19T02:50:16.844Z", "action": "RETURNED", "remarks": "Incorrect dates", "actor_name": "Francis George Cabarle"}, {"date": "Thu Mar 19 2026 10:52:06 GMT+0800 (Philippine Standard Time)", "action": "RESUBMITTED", "remarks": "", "actor_name": "Francis George Cabarle"}]', '41.pdf');


--
-- Data for Name: publication_award_applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."publication_award_applications" ("id", "publication_id", "award_id", "submission_id", "application_date") VALUES
	(29, 18, 1, 41, '2026-03-19');


--
-- Data for Name: publication_per_award; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."publication_per_award" ("id", "award_id", "publication_type_id") VALUES
	(1, 1, 1),
	(1, 2, 2);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('signatures', 'signatures', NULL, '2026-02-12 15:51:04.303845+00', '2026-02-12 15:51:04.303845+00', false, false, NULL, NULL, NULL, 'STANDARD'),
	('pdfs', 'pdfs', NULL, '2026-02-23 18:13:59.380966+00', '2026-02-23 18:13:59.380966+00', false, false, NULL, NULL, NULL, 'STANDARD'),
	('award-documents', 'award-documents', NULL, '2026-02-24 02:03:21.108259+00', '2026-02-24 02:03:21.108259+00', false, false, NULL, NULL, NULL, 'STANDARD'),
	('submissions-documents', 'submissions-documents', NULL, '2026-02-24 02:04:53.11555+00', '2026-02-24 02:04:53.11555+00', false, false, NULL, NULL, NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('95306d52-38f7-4b06-816f-748e0c45395a', 'signatures', '762e5b8a-0bcf-4f2f-8e54-c98422a12875/762e5b8a-0bcf-4f2f-8e54-c98422a12875.png', '762e5b8a-0bcf-4f2f-8e54-c98422a12875', '2026-02-12 16:06:14.749025+00', '2026-02-12 16:06:14.749025+00', '2026-02-12 16:06:14.749025+00', '{"eTag": "\"008afa8667aa98f43bea74a4bfbe937a\"", "size": 47256, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-12T16:06:15.000Z", "contentLength": 47256, "httpStatusCode": 200}', 'd17b6700-7484-4745-8161-41afb1a81d84', '762e5b8a-0bcf-4f2f-8e54-c98422a12875', '{}'),
	('d1485c60-567c-4e53-a8ad-133b1b2d1d45', 'signatures', 'e5a12ec5-a75c-4e28-9f9d-8d4d08957828/e5a12ec5-a75c-4e28-9f9d-8d4d08957828.png', 'e5a12ec5-a75c-4e28-9f9d-8d4d08957828', '2026-02-12 16:18:57.070129+00', '2026-02-12 16:18:57.070129+00', '2026-02-12 16:18:57.070129+00', '{"eTag": "\"107041fe98a911770b43a893ec720200\"", "size": 60033, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-12T16:18:58.000Z", "contentLength": 60033, "httpStatusCode": 200}', '8ce761d6-67fa-4b73-93d2-abf2b5eb8b7f', 'e5a12ec5-a75c-4e28-9f9d-8d4d08957828', '{}'),
	('7542b641-c327-4cbc-8f47-9d75e2e6ec7b', 'signatures', '939829da-3d92-4e23-8601-68c482db8b90/939829da-3d92-4e23-8601-68c482db8b90.png', '939829da-3d92-4e23-8601-68c482db8b90', '2026-02-12 16:50:57.548144+00', '2026-02-12 16:50:57.548144+00', '2026-02-12 16:50:57.548144+00', '{"eTag": "\"1a6b152831e38f419f56fdebbb2ffa2f\"", "size": 240478, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-12T16:50:58.000Z", "contentLength": 240478, "httpStatusCode": 200}', '55746532-e67d-4a9b-a2ed-c9def14443f7', '939829da-3d92-4e23-8601-68c482db8b90', '{}'),
	('5138b231-0360-4d69-ae42-8e549fb979da', 'submissions-documents', '14.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-02-24 02:54:14.333837+00', '2026-02-24 16:01:21.847261+00', '2026-02-24 02:54:14.333837+00', '{"eTag": "\"23d20ca44f68d2e3f65118b3df6d2fa8\"", "size": 260742, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-24T16:01:22.000Z", "contentLength": 260742, "httpStatusCode": 200}', '27d1dc9e-3852-4a45-a18c-27d63e5cff34', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('3a77fef4-6f69-4f82-9638-81a0f41e1ab6', 'submissions-documents', '15.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-02-24 17:19:14.782333+00', '2026-02-24 17:19:14.782333+00', '2026-02-24 17:19:14.782333+00', '{"eTag": "\"10fd738fb6aab2e94fac393bb55059d7\"", "size": 253678, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-24T17:19:15.000Z", "contentLength": 253678, "httpStatusCode": 200}', 'f78bc9dc-79fe-419b-bdd1-59d7f69a5982', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('2664145a-b316-4e7f-9938-e512f12ac3e6', 'submissions-documents', '16.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-02-24 17:22:56.641112+00', '2026-02-24 17:22:56.641112+00', '2026-02-24 17:22:56.641112+00', '{"eTag": "\"310171629b4871b7051728ba1f89a0ff\"", "size": 253635, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-24T17:22:57.000Z", "contentLength": 253635, "httpStatusCode": 200}', '09940cd0-d602-4210-95f0-3153455bd90a', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('bbd36266-4b6b-4727-9ddb-44dfb788d6da', 'submissions-documents', '17.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-02-24 17:24:49.842377+00', '2026-02-24 17:24:49.842377+00', '2026-02-24 17:24:49.842377+00', '{"eTag": "\"9c70d498d9ced7bc726eefe13cdc05de\"", "size": 253622, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-24T17:24:50.000Z", "contentLength": 253622, "httpStatusCode": 200}', '2dc5defb-962b-4967-90e2-5a1a94c440e4', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('0c3afe72-6b5c-4e9a-8219-d8276f3c851e', 'submissions-documents', '18.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-02-24 18:19:04.100949+00', '2026-02-25 06:49:33.435739+00', '2026-02-24 18:19:04.100949+00', '{"eTag": "\"594e6d451ddf591ef0c9ff5d091e0077\"", "size": 260782, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-25T06:49:34.000Z", "contentLength": 260782, "httpStatusCode": 200}', 'e51891b3-579d-4419-8647-2f77c44e80b2', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('d65cf9c5-1b69-41b3-9ebd-fba5c39b3582', 'submissions-documents', '19.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-02-25 06:13:44.399758+00', '2026-02-25 06:15:08.601526+00', '2026-02-25 06:13:44.399758+00', '{"eTag": "\"e92b2f710de3514c0cae0d5b36230e88\"", "size": 260736, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-25T06:15:09.000Z", "contentLength": 260736, "httpStatusCode": 200}', '3bf82232-871b-4738-b70e-d4643f529bd5', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('97bf2176-d297-43a4-8a63-e2827a8df46e', 'submissions-documents', '20.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-02-25 06:46:00.846138+00', '2026-02-25 06:46:42.333286+00', '2026-02-25 06:46:00.846138+00', '{"eTag": "\"6bd92e690a2c81a079b9db1a5fa8d26b\"", "size": 260729, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-25T06:46:43.000Z", "contentLength": 260729, "httpStatusCode": 200}', 'b2520f8b-1a6a-41d3-95d5-94a2b9fa6084', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('79f28c6f-2b3f-48f6-8934-a5c695a45563', 'signatures', 'f43c1041-48db-4c6e-b1e1-0edceb458328/f43c1041-48db-4c6e-b1e1-0edceb458328.png', 'f43c1041-48db-4c6e-b1e1-0edceb458328', '2026-02-25 11:23:48.444575+00', '2026-02-25 11:23:48.444575+00', '2026-02-25 11:23:48.444575+00', '{"eTag": "\"008afa8667aa98f43bea74a4bfbe937a\"", "size": 47256, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-25T11:23:49.000Z", "contentLength": 47256, "httpStatusCode": 200}', 'b27054bf-d2bd-44c2-8ad8-45e4e09f23c3', 'f43c1041-48db-4c6e-b1e1-0edceb458328', '{}'),
	('8aae857a-f277-4292-b0a6-d6aa0ce90f1d', 'submissions-documents', '21.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-02-25 10:26:05.55988+00', '2026-02-25 10:26:47.169178+00', '2026-02-25 10:26:05.55988+00', '{"eTag": "\"df20ccafd39418c30f44e33a7a9a5570\"", "size": 260782, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-25T10:26:48.000Z", "contentLength": 260782, "httpStatusCode": 200}', 'f1bc4133-9005-4f9c-8af6-50ed7585bc66', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('426984d1-cd83-4a0d-b9c6-9d8139e848a3', 'signatures', '8698372c-ab70-44e3-8658-9ace4293aa83/8698372c-ab70-44e3-8658-9ace4293aa83.png', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-02-25 11:39:57.876207+00', '2026-03-03 14:54:07.180207+00', '2026-02-25 11:39:57.876207+00', '{"eTag": "\"20d75c8ca805d45d42595a7ed9cd3856\"", "size": 13625, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-03T14:54:08.000Z", "contentLength": 13625, "httpStatusCode": 200}', 'a97d378d-1f59-4329-bdb0-6156409b2604', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('ed9c41ab-66e7-4ba4-ab0c-cfcde2774608', 'signatures', '5b031afe-bd0a-444f-9d65-773989cecfda/5b031afe-bd0a-444f-9d65-773989cecfda.png', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-02 10:57:44.439638+00', '2026-03-02 10:57:44.439638+00', '2026-03-02 10:57:44.439638+00', '{"eTag": "\"008afa8667aa98f43bea74a4bfbe937a\"", "size": 47256, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T10:57:45.000Z", "contentLength": 47256, "httpStatusCode": 200}', '96314695-ae8e-469d-93f7-bdd4da390c8e', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('9c5e8fb8-05a4-47cb-b07b-e4b143656ab0', 'submissions-documents', '22.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-02 10:59:26.786127+00', '2026-03-02 13:37:27.435633+00', '2026-03-02 10:59:26.786127+00', '{"eTag": "\"9130b6eba55a218b0daf41f7101d437c\"", "size": 289132, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T13:37:28.000Z", "contentLength": 289132, "httpStatusCode": 200}', '8287917b-6e19-475f-b481-906eb768120b', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('23838c43-d6df-489d-9be8-e77d588a7c49', 'submissions-documents', '23.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-02 14:51:26.23899+00', '2026-03-02 14:51:26.23899+00', '2026-03-02 14:51:26.23899+00', '{"eTag": "\"286d1454cd9ab0157d487642ea417239\"", "size": 253683, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T14:51:27.000Z", "contentLength": 253683, "httpStatusCode": 200}', 'd995697f-98c5-4393-a9ea-87d5b0d853cf', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('fb91d9f0-9461-4aea-9f99-052f3d0dc193', 'submissions-documents', '24.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-02 14:55:36.543432+00', '2026-03-02 14:55:36.543432+00', '2026-03-02 14:55:36.543432+00', '{"eTag": "\"ae42c8c1c10a5d31324a48574c5dfb95\"", "size": 253654, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T14:55:37.000Z", "contentLength": 253654, "httpStatusCode": 200}', '8d2137d1-7e30-4b04-ac20-e8014d392a2a', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('11aac9e4-7164-4be2-abc9-c336f124cad2', 'submissions-documents', '25.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-02 15:01:52.501223+00', '2026-03-02 15:01:52.501223+00', '2026-03-02 15:01:52.501223+00', '{"eTag": "\"ccb3338e2e1ca6edab9e48f45600d738\"", "size": 288752, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T15:01:53.000Z", "contentLength": 288752, "httpStatusCode": 200}', '3901dd27-1bce-4db1-90a5-784350c3d587', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('77b5f162-b42a-4a41-8318-66f83dc7448b', 'submissions-documents', '26.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-02 15:03:48.977295+00', '2026-03-02 15:03:48.977295+00', '2026-03-02 15:03:48.977295+00', '{"eTag": "\"0c582460031693c3f2dc0be6a3bf8a2a\"", "size": 253681, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T15:03:49.000Z", "contentLength": 253681, "httpStatusCode": 200}', 'a38c26b9-5464-4c03-9aa6-0cb88f735fb0', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('f710fd31-ea2d-4e7c-8d90-3dc7bd98ceab', 'submissions-documents', '27.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-02 15:08:01.196767+00', '2026-03-02 15:08:21.246786+00', '2026-03-02 15:08:01.196767+00', '{"eTag": "\"b882c1ef82489d0592b7a4334d8758fb\"", "size": 260745, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T15:08:22.000Z", "contentLength": 260745, "httpStatusCode": 200}', '7b57afb0-a64e-4629-96d7-0571029d3b74', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('90264385-9ece-41ab-9340-56638ab6ecb4', 'submissions-documents', '28.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-02 15:14:00.220968+00', '2026-03-02 15:14:00.220968+00', '2026-03-02 15:14:00.220968+00', '{"eTag": "\"cd111eaa0a6a59464a8fb9992219ebb5\"", "size": 288756, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T15:14:01.000Z", "contentLength": 288756, "httpStatusCode": 200}', '28bddf5f-4ac4-48df-aff3-7e536afb5d9c', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('6fe164f2-a424-4976-b187-d3397b60829c', 'submissions-documents', '29.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-02 15:18:42.952484+00', '2026-03-02 15:20:37.614791+00', '2026-03-02 15:18:42.952484+00', '{"eTag": "\"dc941514bc281bac9ea561aa9433c0fc\"", "size": 21, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T15:20:38.000Z", "contentLength": 21, "httpStatusCode": 200}', 'b034a31d-2cf3-412c-9389-06df49e8575f', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('f9065ef4-beb3-411b-bf58-0502eeaf3d61', 'submissions-documents', '30.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-02 15:28:58.184913+00', '2026-03-02 15:29:51.111622+00', '2026-03-02 15:28:58.184913+00', '{"eTag": "\"b7784951dd8c0712678a50d05ccee487\"", "size": 35, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T15:29:52.000Z", "contentLength": 35, "httpStatusCode": 200}', '518045cb-1736-4428-b14c-31b4289b106a', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('56b73217-3be1-4d85-87b1-e71aca2df408', 'submissions-documents', '31.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-02 15:33:13.536601+00', '2026-03-02 15:59:57.962352+00', '2026-03-02 15:33:13.536601+00', '{"eTag": "\"1def6b9eeb0dc6e248162b3d8b986574\"", "size": 300788, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T15:59:58.000Z", "contentLength": 300788, "httpStatusCode": 200}', '88754796-df84-4208-8cd7-fb4749e44b8b', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('8af29691-4bf2-4e86-b334-e47f7eef29ba', 'submissions-documents', '32.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-02 16:17:39.447198+00', '2026-03-02 16:18:04.728118+00', '2026-03-02 16:17:39.447198+00', '{"eTag": "\"4f4bb664a37d93b204b9b705b3e6e2f1\"", "size": 300815, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T16:18:05.000Z", "contentLength": 300815, "httpStatusCode": 200}', '6eef6cad-d944-421e-887a-7562816e8308', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('09024514-74a3-4a83-828d-aaddbbe79b98', 'submissions-documents', '33.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-02 17:43:53.61681+00', '2026-03-02 17:45:05.402512+00', '2026-03-02 17:43:53.61681+00', '{"eTag": "\"3569f8e366e46c1b5fa6148da004ad8c\"", "size": 300912, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T17:45:06.000Z", "contentLength": 300912, "httpStatusCode": 200}', 'dc41b871-c900-4e78-a932-5dabc1895dae', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('8ae43d1c-4927-41a0-b5c5-31a8c212dd54', 'submissions-documents', '34.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-02 18:13:08.330581+00', '2026-03-02 18:18:54.71007+00', '2026-03-02 18:13:08.330581+00', '{"eTag": "\"99d31ef64abee14d559749a1fe0884cd\"", "size": 300937, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-02T18:18:55.000Z", "contentLength": 300937, "httpStatusCode": 200}', '86028cc2-91bc-4327-969f-9a4c29ea8077', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('0dd3336d-ae11-4242-bbdf-dd8d7d2ac49e', 'submissions-documents', '35.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-03 02:30:35.599022+00', '2026-03-03 02:33:19.639027+00', '2026-03-03 02:30:35.599022+00', '{"eTag": "\"ddbabf1cc2c96ba51aec6799c55cda3f\"", "size": 300962, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-03T02:33:20.000Z", "contentLength": 300962, "httpStatusCode": 200}', 'a62c9618-dd0c-45a6-83b9-7fdcabf3ad20', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('4ae13d21-4cd2-4a86-b194-1485390697a5', 'signatures', 'b704b4c6-fb99-411c-9f8e-eac0dcb90381/b704b4c6-fb99-411c-9f8e-eac0dcb90381.png', 'b704b4c6-fb99-411c-9f8e-eac0dcb90381', '2026-03-03 14:15:55.2088+00', '2026-03-03 14:50:05.375793+00', '2026-03-03 14:15:55.2088+00', '{"eTag": "\"1157ba54855b9b6765fc5be2fcc5dd49\"", "size": 70974, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-03T14:50:06.000Z", "contentLength": 70974, "httpStatusCode": 200}', 'fc616a23-6b2e-41cc-8c94-09e3d356a5fa', 'b704b4c6-fb99-411c-9f8e-eac0dcb90381', '{}'),
	('ac002e7d-6ea7-420a-ab96-8bc75501efd6', 'submissions-documents', '36.pdf', '5b031afe-bd0a-444f-9d65-773989cecfda', '2026-03-03 03:42:25.347686+00', '2026-03-03 04:01:05.480161+00', '2026-03-03 03:42:25.347686+00', '{"eTag": "\"a3e8a3b8baef6d9e23a3ba9153702500\"", "size": 300979, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-03T04:01:06.000Z", "contentLength": 300979, "httpStatusCode": 200}', '69679bea-7426-48cc-96de-088f6e0d9264', '5b031afe-bd0a-444f-9d65-773989cecfda', '{}'),
	('4fef3b4a-dd43-497a-a9b4-7a9b0fdd0e4a', 'submissions-documents', '37.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-03 14:55:55.471814+00', '2026-03-03 14:55:55.471814+00', '2026-03-03 14:55:55.471814+00', '{"eTag": "\"339106703372bd1f0c96a3f0b81cb7cb\"", "size": 265340, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-03T14:55:56.000Z", "contentLength": 265340, "httpStatusCode": 200}', '8dd6b7cd-b5d1-4c27-93cb-5ce17a4d7679', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('4336d2ef-a3c7-492d-b646-140a565cd982', 'signatures', '67bb171f-27c4-444e-ba54-a6fe564b438f/67bb171f-27c4-444e-ba54-a6fe564b438f.png', '67bb171f-27c4-444e-ba54-a6fe564b438f', '2026-03-03 15:12:40.145399+00', '2026-03-03 15:12:40.145399+00', '2026-03-03 15:12:40.145399+00', '{"eTag": "\"a83d8f4502fe108212a681dcdbfeabe2\"", "size": 19943, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-03-03T15:12:41.000Z", "contentLength": 19943, "httpStatusCode": 200}', '1ca09ff1-9224-46ab-b737-eb60c62f8bd6', '67bb171f-27c4-444e-ba54-a6fe564b438f', '{}'),
	('c235adf2-f41a-4812-a5c4-6fa808fac727', 'submissions-documents', '41.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-19 02:48:02.169089+00', '2026-03-19 02:52:06.710641+00', '2026-03-19 02:48:02.169089+00', '{"eTag": "\"dfd0d6ac812db0f36fadee27225011f3\"", "size": 265500, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-19T02:52:07.000Z", "contentLength": 265500, "httpStatusCode": 200}', '05f067dc-a750-4e15-99a6-f904ce678f86', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('cc4d96d1-561e-4aa6-8607-69cf6acc0f35', 'submissions-documents', '38.pdf', '67bb171f-27c4-444e-ba54-a6fe564b438f', '2026-03-03 14:57:20.512474+00', '2026-03-03 15:17:33.755228+00', '2026-03-03 14:57:20.512474+00', '{"eTag": "\"80d69eecdca9ad8a67b72c0615985db9\"", "size": 303184, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-03T15:17:34.000Z", "contentLength": 303184, "httpStatusCode": 200}', '1818c090-a9b7-45e5-8e78-cce65219133f', '67bb171f-27c4-444e-ba54-a6fe564b438f', '{}'),
	('7e5a37ef-a865-49a3-81fc-47684f369db0', 'submissions-documents', '39.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-18 15:07:17.907764+00', '2026-03-18 15:07:17.907764+00', '2026-03-18 15:07:17.907764+00', '{"eTag": "\"cb446170a45a528b3f63e2923be27e80\"", "size": 265288, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-18T15:07:18.000Z", "contentLength": 265288, "httpStatusCode": 200}', 'c5ee1a61-db39-4505-9c87-20cd20f7a21c', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}'),
	('55984a29-9ade-44ba-a09a-0e95c65c77e0', 'submissions-documents', '40.pdf', '8698372c-ab70-44e3-8658-9ace4293aa83', '2026-03-18 15:22:10.303828+00', '2026-03-18 15:22:10.303828+00', '2026-03-18 15:22:10.303828+00', '{"eTag": "\"81f2977511d170861d9d841b71a0dd3a\"", "size": 265288, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-03-18T15:22:11.000Z", "contentLength": 265288, "httpStatusCode": 200}', 'deaac292-4665-4cd5-af4e-d721c426556d', '8698372c-ab70-44e3-8658-9ace4293aa83', '{}');


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 831, true);


--
-- Name: awards_award_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."awards_award_id_seq"', 1, true);


--
-- Name: departments_department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."departments_department_id_seq"', 1, false);


--
-- Name: publication_award_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."publication_award_applications_id_seq"', 29, true);


--
-- Name: publication_per_award_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."publication_per_award_id_seq"', 1, true);


--
-- Name: publications_publication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."publications_publication_id_seq"', 24, true);


--
-- Name: submissions_submission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."submissions_submission_id_seq"', 41, true);


--
-- Name: types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."types_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict ZzLQ9kjLsmpKfMZgnkqZj8tbHLkbahRc7lPWF5GCd58QNrZIL14TAVMRwvixSI9

RESET ALL;
