import { IVideo } from '../model/Video';
export type VideoData = Omit<IVideo, "thumbnail" | "video"> & {
    thumbnail: string
    video: string
}

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    body?: any
    headers?: Record<string, string>
}

class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const { method = "GET", body, headers } = options;

        const defaultHeaders = {
            "Content-type": "application/json",
            ...headers,
        };

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "An error occurred");
        }
        return response.json() as Promise<T>
    }

    async getVideos() {
        return this.fetch("/videos")
   }
   
   
   async createVideo(videoData: VideoData) {
       return this.fetch("/videos", {
           method: "POST",
           body: videoData,
       })
   }
   
}



export const apiClient = new ApiClient()