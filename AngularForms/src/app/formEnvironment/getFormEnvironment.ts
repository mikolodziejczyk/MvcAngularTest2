import { FormEnvironment } from "./formEnvironment";

export function getFormEnvironment() : FormEnvironment {
    let dataElement = (<HTMLInputElement>document.getElementById("formEnvironment"));
    let data : FormEnvironment = null;
    if (dataElement)
    {
      data = <FormEnvironment>JSON.parse(dataElement.value);
    }
  
    return data;
  }
  