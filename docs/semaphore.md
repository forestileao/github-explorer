# Semaphore smoke pipeline

The default pipeline is configured in [`.semaphore/semaphore.yml`](../.semaphore/semaphore.yml).
It is a minimal CI smoke check: it verifies that Semaphore can start a job and
complete a basic shell command. It does not build or test the application.

## Configuration

- Pipeline version: `v1.0`.
- Pipeline name: `Semaphore smoke pipeline`.
- Linux agent: `e1-standard-2` with the `ubuntu2204` image.
- One block, `Smoke check`, containing one job, `Wait five seconds`.
- The job's only command is `sleep 5`.

The command waits five seconds and exits successfully. No repository checkout,
application dependencies, secrets, or deployment access are needed. Total hosted
run time also includes scheduling and agent startup.

## Run on Semaphore

Hosted execution requires this repository to be connected to a Semaphore project
with access to the configured agent. Use `.semaphore/semaphore.yml` as the
project's pipeline configuration path.

Trigger a workflow for a branch containing the configuration, then open the
`Semaphore smoke pipeline` run in Semaphore. Verify that the `Smoke check` block
and `Wait five seconds` job pass, and that the job log shows `sleep 5` completing
with exit status zero. No hosted run is claimed by these local validation steps.

## Validate locally

Run these commands from the repository root with Python 3 and PyYAML available:

```sh
python3 -c "import yaml; yaml.safe_load(open('.semaphore/semaphore.yml'))"
```

Parsing confirms valid YAML, but does not validate Semaphore's schema. Check the
expected structure and the sole smoke command as well:

```sh
python3 - <<'PY'
from pathlib import Path
import yaml

config = yaml.safe_load(Path('.semaphore/semaphore.yml').read_text())
assert set(config) == {'version', 'name', 'agent', 'blocks'}
assert config['version'] == 'v1.0'
assert config['name'] == 'Semaphore smoke pipeline'
assert config['agent'] == {
    'machine': {'type': 'e1-standard-2', 'os_image': 'ubuntu2204'}
}
assert config['blocks'] == [{
    'name': 'Smoke check',
    'task': {'jobs': [{
        'name': 'Wait five seconds',
        'commands': ['sleep 5'],
    }]},
}]
print('Pipeline structure is valid.')
PY
sleep 5
```

The Python check should print `Pipeline structure is valid.` and exit with status
zero. The `sleep 5` command should return after five seconds with status zero and
no output. These checks establish local configuration and command behavior;
hosted verification requires the connected Semaphore project described above.
