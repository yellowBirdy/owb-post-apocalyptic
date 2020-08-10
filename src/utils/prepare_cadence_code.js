export default async (url, match) => {
    // match = {query: regexp, item1: replace1, ... itemN: replaceN}
    const codeFile = await fetch(url);
    const rawCode = await codeFile.text();
    if (!match) {
      return rawCode;
    }
  
    const { query } = match;
    return rawCode.replace(query, (item) => {
      return match[item];
    });
  };