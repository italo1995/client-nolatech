import { addToast } from "@/libs/store";
import { User } from "@/libs/user"
export default class request {
  // private domain: string = 'https://italo-api.payatraslados.com/api/v1'
  private domain: string = 'http://italo:5555/api/v1'
  private token: string | null = localStorage.getItem('token')

  public async get(url: string) {
    let headersOptions: any = {
      method: 'GET',
    };

    if (this.token) {
      headersOptions = {
        method: 'GET',
        headers: {
          "Authorization": `bearer ${this.token}`,
        }
      };
    }

    const response = await fetch(`${this.domain}/${url}`, headersOptions);
    if (response.ok) {
      let json = await response.json();
      return json.data;
    } else {
      this.handleErrorResponse(response);
    }
  }

  private formDataToObject(formElm: HTMLFormElement) {
    var result: any = {};
    var values = formElm.values();
    var keys = formElm.keys();
    var key;

    while (!(key = keys.next()).done) {
      result[key.value] = values.next().value;
    }
    return result;
  }

  public async post(url: string, data: FormData) {
    const body = JSON.stringify(Object.fromEntries(data.entries()));
    const token = localStorage.getItem('token');
    let headersOptions: any = {
      method: 'POST',
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      body: body,
    };

    if (token) {
      headersOptions = {
        method: 'POST',
        headers: {
          "Authorization": `bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: body,
      };
    }

    try {
      const response = await fetch(`${this.domain}/${url}`, headersOptions);
      if (response.ok) {
        let json = await response.json();
        return json;
      } else {
        this.handleErrorResponse(response);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete(url: string) {
    const token = localStorage.getItem('token');
    let headersOptions: any = {
      method: 'DELETE',
      headers: {
        "Authorization": `bearer ${token}`
      }
    };

    try {
      const response = await fetch(`${this.domain}/${url}`, headersOptions);
      if (response.ok) {
        let json = await response.json();
        return json;
      } else {
        this.handleErrorResponse(response);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleErrorResponse(response: Response) {
    if (response.status === 401) {
      let dataToast = {
        message: `Sesion vencida, sera redireccionado`,
        type: 'error',
        dismissible: true,
      };
      addToast(dataToast);
      const redirectTimeMesage = 2000;
      setTimeout(() => {
        User.logout();
        window.location.reload();
      }, redirectTimeMesage);
    } else {
      let dataToast = {
        message: `Ocurrio un error`,
        type: 'error',
        dismissible: true,
      };
      addToast(dataToast);
    }
  }

  private handleError(error: any) {
    let dataToast = {
      message: `Ocurrio un error`,
      type: 'error',
      dismissible: true,
    };
    addToast(dataToast);
    console.error("Error:", error);
  }
}