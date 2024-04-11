
export const mapDataToMessages = (data, mappings) => {
    const matchedData = [];
  
    if (mappings.length === 0) {
      if (Array.isArray(data)) {
        console.log("Data Array:", data);
        return data.map((obj) => JSON.stringify(obj)).join(", ");
      }
      console.log("Data:", data);
      return JSON.stringify(data);
    }
  
    if (!Array.isArray(data)) {
      for (const mapping of mappings) {
        let itemData = data;
        const properties = mapping.split(".");
        console.log("Properties:", properties);
        for (const prop of properties) {
          console.log("Property:", prop, "itemData", itemData);
          if (itemData.hasOwnProperty(prop)) {
            itemData = itemData[prop];
          } else {
            itemData = null;
            break;
          }
        }
        if (itemData !== null) {
          matchedData.push(itemData);
        }
      }
      return matchedData.join(", ");
    }
  
    for (const item of data) {
      for (const mapping of mappings) {
        let itemData = item;
        const properties = mapping.split(".");
        console.log("Properties:", properties);
        for (const prop of properties) {
          console.log("Property:", prop, "itemData", itemData);
          if (itemData.hasOwnProperty(prop)) {
            itemData = itemData[prop];
          } else {
            itemData = null;
            break;
          }
        }
        if (itemData !== null) {
          matchedData.push(itemData);
        }
      }
    }
  
    return matchedData.join(", ");
  };