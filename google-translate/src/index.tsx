import { Detail, Clipboard, ActionPanel, Action } from "@raycast/api";
import React, { useEffect, useState } from "react";
import translate from "@vitalets/google-translate-api";

export default function Command() {
  const [newString, setNewString] = useState("");
  useEffect(() => {
    async function getClipboard() {
      const originalString = await Clipboard.readText();
      if (originalString) {
        console.log(originalString);
        const res = await translate(originalString, { to: "ko", tld: "co.kr" });
        setNewString(res.text);
      }
    }
    getClipboard();
  }, []);

  return (
    <Detail
      markdown={newString.replaceAll("\n", "\n\n")}
      actions={
        <ActionPanel title="Google Translate">
          <Action.CopyToClipboard content={newString} />
        </ActionPanel>
      }
    />
  );
}
