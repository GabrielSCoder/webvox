import { useNavigate } from "react-router-dom";
import ReactionsTemplate from "../ReactionsTemplate";
import Card from "../../components/Card";
import TitleTag from "../../components/TitleTags";
import { formatDateTime } from "../../utils/dateFormat";

type cardProps = {
    postId : number
    title: string;
    user?: string;
    body: string;
    likes: number;
    deslieks?: number;
    shares?: number;
    time?: string;
    username?: string
    img_url?: string
    liked : boolean
    handleReaction : any
    lockedReact : boolean
    replies : number
    data_criacao : string
    profileId ?: number
}

export default function PostCard(props: cardProps) {

    const { body, likes, user, username, img_url, liked, handleReaction, lockedReact, postId, replies, data_criacao, profileId } = props


    const nav = useNavigate()

    const redirect = () => nav(`/${username}/post/${postId}`)

    const btn = (event: React.MouseEvent) => {
        event.stopPropagation()
        nav("/" + username)
    }


    return (
        <>
            <Card className="flex-col hover:bg-gray-100 dark:hover:bg-opacity-5 hover:cursor-pointer px-4 pt-3 border-b" click={redirect} >
                <Card className="justify-start items-center gap-2" >
                    <div className="rounded-full h-[40px] w-[40px] bg-black">
                        {!img_url ? <div className="w-full h-full rounded-full bg-red-500"></div> : <img src={img_url} className="h-full w-full rounded-full object-cover"></img>}
                    </div>
                    <button onClick={btn} className="">
                        <TitleTag.Sub className="hover:underline hover:decoration-white hover:cursor-pointer text-base font-normal"> {user}</TitleTag.Sub>
                    </button>
                    <TitleTag.Normal className="text-gray-500">@{username}</TitleTag.Normal>
                    <TitleTag.Normal className="text-gray-500">·  {formatDateTime(data_criacao)}</TitleTag.Normal>
                </Card>

                <Card className="ml-12 flex-col justify-start">
                    <TitleTag.Parag className="break-words text-left ">{body}</TitleTag.Parag>

                    <ReactionsTemplate props={{ likes: likes, isLiked : liked, handleReaction : handleReaction, id : props.postId, locked : lockedReact, replies : replies, profileId : profileId}} />
                </Card>

            </Card>
        </>

    )
}