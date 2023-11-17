import type {
    IEditorModel,
    IPlayerModel,
    IContentMetadata
} from '@lumieducation/h5p-server';

const getHeaders = () => {
    const accessToken = sessionStorage.getItem('userAccessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };
  
  }

export interface IContentListEntry {
    contentId: string;
    mainLibrary: string;
    title: string;
    originalNewKey?: string;
}

export interface IContentService {
    delete(contentId: string): Promise<void>;
    getEdit(contentId: string): Promise<IEditorModel>;
    getPlay(contentId: string): Promise<IPlayerModel>;
    list(): Promise<IContentListEntry[]>;
    save(
        contentId: string,
        requestBody: { library: string; params: any }
    ): Promise<{ contentId: string; metadata: IContentMetadata }>;
    generateDownloadLink(contentId: string): string;
}

export class ContentService implements IContentService {
    /**
     *
     */
    constructor(protected baseUrl: string = '') { }

    delete = async (contentId: string): Promise<void> => {
       
        const result = await fetch(`${this.baseUrl}/${contentId}`, {
            method: 'delete'
        });
        if (!result.ok) {
            throw new Error(
                `Error while deleting content: ${result.status} ${
                    result.statusText
                } ${await result.text()}`
            );
        }
    };

    getEdit = async (contentId: string): Promise<IEditorModel> => {
       
        const res = await fetch(`${this.baseUrl}/${contentId}/edit`);
        if (!res || !res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
    };

    getPlay = async (contentId: string): Promise<IPlayerModel> => {
      
        const res = await fetch(`${this.baseUrl}/${contentId}/play`, getHeaders());
        if (!res || !res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
    };

    list = async (): Promise<IContentListEntry[]> => {
      
        const result = await fetch(this.baseUrl);
        if (result.ok) {
            return result.json();
        }
        throw new Error(
            `Request to REST endpoint returned ${result.status} ${
                result.statusText
            }: ${await result.text()}`
        );
    };

    save = async (
        contentId: string,
        requestBody: { library: string; params: any }
    ): Promise<{ contentId: string; metadata: IContentMetadata }> => {
        if (contentId) {
          
        } else {
           
        }

        const body = JSON.stringify(requestBody);

        const res = contentId
            ? await fetch(`${this.baseUrl}/${contentId}`, {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body
              })
            : await fetch(this.baseUrl, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body
              });

        if (!res || !res.ok) {
            throw new Error(
                `${res.status} ${res.statusText} - ${await res.text()}`
            );
        }
        return res.json();
    };
    generateDownloadLink = (contentId: string): string =>
        `${this.baseUrl}/download/${contentId}`;
}
