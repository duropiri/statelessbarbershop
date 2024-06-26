// /data/videos.ts
import axios from 'axios';

export interface Video {
  title: string;
  src: string;
}

const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response = await axios.get('http://localhost:1337/api/videos?populate=*', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });
    console.log('API response:', response.data); // Debugging statement

    const videoData = response.data.data.map((video: any) => ({
      title: video.attributes.title,
      src: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${video.attributes.video.data.attributes.url}`, // Adjust this based on the actual structure of your media field
    }));
    console.log('Mapped video data:', videoData); // Debugging statement

    return videoData;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

export default fetchVideos;





// export const Videos = [
//     { title: "Asake x Axcel", src: "/videos/video1.mp4" },
//     { title: "New Balance x Axcel", src: "/videos/video2.mp4" },
//     { title: "Usports x Axcel", src: "/videos/video3.mp4" },
//     { title: "Montreal x Axcel", src: "/videos/video4.mp4" },
//   ];