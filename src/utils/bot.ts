export function cleanUpBotMessage(text: string) {
  text = text.replace(/\./g, "\\.").replace(/-/g, "\\-").replace(/!/g, "\\!").replace(/#/g, "\\#");

  return text;
}

export function hardCleanUpBotMessage(text: string) {
  text = text
    .replace(/\./g, "\\.")
    .replace(/-/g, "\\-")
    .replace(/_/g, "\\_")
    .replace(/\|/g, "\\|")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/`/g, "\\`")
    .replace(/!/g, "\\!")
    .replace(/#/g, "\\#");

  return text;
}
