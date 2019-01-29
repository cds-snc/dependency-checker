workflow "Build and test" {
  resolves = ["Test"]
  on = "push"
}

action "Build" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "install"
}

action "Test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Build"]
  args = "test"
  env = {
    FIRESTORE_URL = "abcd"
    GITHUB_PEM = "abcd"
    ISSUER_ID = "abcd"
  }
}
