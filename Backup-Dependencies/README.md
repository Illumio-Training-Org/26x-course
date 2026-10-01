# Backup-Dependencies

Fallback copies of the third-party code that `! 26.x Lab` and the four 26.x
exams (Foundation, Associate, Specialist, Select) download during setup from
places the training team doesn't control. If an owner deletes, renames or
breaks one of these, the labs fail to build - these copies let us switch to
our own version quickly.

Taken 2026-10-01. A local copy is also kept on my Mac in
`CX-NEW/BackupDependencies/`.

| Folder | Original | Used by | What for | Licence |
|---|---|---|---|---|
| `pc-connector/` (+ `pc-connector.bundle`) | https://github.com/justinvid/pc-connector @ `0b2b1cf3dbb3f1456aa53c82e8c6ad8b6aa26109` (2026-08-12) | Lab + all 4 exams: `track_scripts/setup-cloud-client` clones it and runs `terraform apply` | Creates the learner's Project Crystal deployment | No licence file; copied here with the author's (Justin's) permission |
| `illumio-instruqt-terraform-template/` (+ `.bundle`) | https://github.com/jdschmitz15/illumio-instruqt-terraform-template @ `3ee54a2c07dcbec99dee63f41bfd1125b03b9de6` (2026-01-21) | Lab + all 4 exams: `gomplate` renders `index.html.tmpl` | The tab tile with the learner's magic link and AWS credentials (only `index.html.tmpl` is used) | MIT (`LICENSE` kept) |
| `terraform-provider-terracurl-2.0.0/` | Terraform provider `devops-rob/terracurl` 2.0.0, from https://github.com/devops-rob/terraform-provider-terracurl/releases/tag/v2.0.0 | Needed by `pc-connector` during `terraform init` | `linux_amd64` zip + `SHA256SUMS` + `.sig`; SHA-256 `dc891dc93cb1d7dae66c23c3659dcae52ae5e92f27c2113b431e0c2d805b5391`, checked against the published SHA256SUMS and the Terraform Registry | MPL-2.0 (`LICENSE` kept) |

The folders are plain copies of each repo's files (no Git history). Each
`.bundle` is the full Git repo in one file: `git clone pc-connector.bundle pc-connector`.

Not backed up (official vendors or our own, low risk): HashiCorp apt repo and
providers (`aws`, `local`, `random`, `tls`), `illumio/illumio-cloudsecure`,
Cilium 1.18.6, the Illumio C-VEN Helm chart (`oci://quay.io/illumio/illumio`
5.6.1), Instruqt/Google machine images, `illumio-training/k3scilium`, and the
Crystal API itself.

## How to switch to these copies

All five setup scripts (`Course Lab/track_scripts/setup-cloud-client` and the
four `Course Exam/*/track_scripts/setup-cloud-client`) need the same change.
Push each track and commit afterwards.

**pc-connector** - replace

```
git clone https://github.com/justinvid/pc-connector.git
```

with

```
git clone --depth 1 https://github.com/Illumio-Training-Org/26x-course.git /tmp/26x-course
cp -r /tmp/26x-course/Backup-Dependencies/pc-connector ~/pc-connector
```

**Tile template** - replace

```
git clone https://github.com/jdschmitz15/illumio-instruqt-terraform-template.git
```

with (reusing the clone above, or cloning it if it isn't there yet)

```
[ -d /tmp/26x-course ] || git clone --depth 1 https://github.com/Illumio-Training-Org/26x-course.git /tmp/26x-course
cp -r /tmp/26x-course/Backup-Dependencies/illumio-instruqt-terraform-template ~/illumio-instruqt-terraform-template
```

**terracurl provider** - before the `pc-connector` `terraform init`, add:

```
P=~/.terraform.d/plugins/registry.terraform.io/devops-rob/terracurl/2.0.0/linux_amd64
mkdir -p "$P"
unzip -o /tmp/26x-course/Backup-Dependencies/terraform-provider-terracurl-2.0.0/terraform-provider-terracurl_2.0.0_linux_amd64.zip -d "$P"
```

Terraform uses a provider from that local folder instead of downloading it.

## Refreshing

If the labs move to a newer version of any of these, re-copy the files, recreate
the bundle (`git bundle create <name>.bundle --all` in a fresh clone), update
the commit/version in the table above, and commit.
