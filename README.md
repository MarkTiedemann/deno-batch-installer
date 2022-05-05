# deno-batch-installer

**One-line batch commands to install Deno in your project.**

## Usage

Install a specific version (e.g. v1.21.1):

```batch
curl -fsS https://batch-installer.deno.dev/v1.21.1 | powershell -c cmd /c $input
```

Example output:

```batch
curl -o deno.zip https://dl.deno.land/release/v1.21.1/deno-x86_64-pc-windows-msvc.zip
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 24.7M  100 24.7M    0     0  14.3M      0  0:00:01  0:00:01 --:--:-- 14.3M
tar xf deno.zip
del deno.zip
```

## License

MIT
