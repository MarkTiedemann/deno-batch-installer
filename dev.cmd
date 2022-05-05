@echo off
if not exist deno.exe (
	curl -fsS https://batch-installer.deno.dev/v1.21.1 | powershell -c cmd /c $input
)
.\deno.exe run --allow-net function.ts
