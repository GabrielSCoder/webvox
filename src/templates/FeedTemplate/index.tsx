import FeedList from "../Feed"
import Card from "../../components/Card"
import HighlightTextarea from "../CreatePostCardV2"

export default function FeedTemplate(props: { feedData: any, userData: any, likesList: any, HandleReact: any, getDataWithUser : any }) {

    const { feedData, userData, likesList, HandleReact, getDataWithUser } = props
    const isLogged = localStorage.getItem("profile")

    return (
        <Card className="flex-col w-full gap-4 justify-start items-start rounded-md">

            {isLogged ? (
                // <CreatePostCard userData={userData}/>
                <HighlightTextarea userData={userData} getDataWithUser={getDataWithUser} />
            ) : ""}

            <div className=" border-b w-full"></div>

            <FeedList data={feedData} handleReaction={HandleReact} likesList={likesList} userId={userData.id} />

        </Card>
    )
}