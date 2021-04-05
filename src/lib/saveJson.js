export const saveJson = (content) => {
  const ut = +new Date();
  const fileName = `map_1_${ut}.json`;
  const contentType = 'text/json';

  const a = document.createElement("a");
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  console.log(content);
  a.click();
}