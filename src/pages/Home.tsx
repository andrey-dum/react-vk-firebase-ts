import { FC } from "react"
import { Box } from "@mui/material"
import { AddPost } from "../components/AddPost"
import { Posts } from "./Posts"

interface IProps {

}

const INITIAL_POST = {
    _id: '121f2',
    title: "Initial Post",

    author: {
        _id: '1',
        name: 'Jhon Doe',
        email: "",
        avatar: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
        online: true
    },
    createdAt: '10 min ago',
    images: [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          title: 'Coffee',
        },
        {
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          title: 'Hats',
        },
        {
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          title: 'Honey',
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          title: 'Basketball',
        },
        {
          img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
          title: 'Fern',
        },
        {
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          title: 'Mushrooms',
        },
   
      ]
}


export const Home: FC<IProps> = () => {
    // const [posts, setPosts] = useState<any[]>([]);

    // const {db} = useAuth()

    // const getPosts = async () => {
    //   const querySnapshot = await getDocs(collection(db, "posts"));
    //   const data = querySnapshot.docs.map((doc) => ({
    //     // doc.data() is never undefined for query doc snapshots
    //     ...doc.data(),
    //     _id: doc.id,
    //   } as IPost));
    //   console.log(data)
    //   setPosts([...data, ...posts])
    // }


    return (
        <Box className="home">
            <AddPost />
            <Posts />
        </Box>
    )
}



