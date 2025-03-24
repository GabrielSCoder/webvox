import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import ProfileWallpaper from "../../components/ProfileWallpaper";
import TitleTag from "../../components/TitleTags";
import { formatDate } from "../../utils/dateFormat";


type cardProps = {
    profileData: any
    userData?: any
    followSituation : number
    handleFollow: any
    handleUnfollow: any
    followers: any
    following: any
    setProfileModal : any
    profileModal : any
}

export default function ProfileCard(props: cardProps) {

    const { profileData, userData, followSituation, followers, following, handleFollow, handleUnfollow, setProfileModal } = props

    const logado = window.localStorage.getItem("profile")

    const nav = useNavigate()

    const location = useLocation()
    
    const FollowBtn = () => {

        if (logado && userData && userData.nome != profileData.nome) {
            if (followSituation == 1) {
                return <Button className="text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-lg hover:bg-slate-200"
                    text="Deixar de seguir" onClick={() => handleUnfollow({ follower_id: userData.id, following_id: profileData.id, invertTotalizer : true, profileId : profileData.id })} />
            } else if (userData?.id != profileData?.id) {
                return <Button className="text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-lg hover:bg-slate-200"
                    text={followSituation == 2 ? "Seguir de volta" : "seguir"} onClick={() => handleFollow({ follower_id: userData.id, following_id: profileData.id, invertTotalizer : true, profileId : profileData.id })} />
            } else {
                return <p className=""></p>
            }

        } else {
            return <Button className="text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-lg hover:bg-slate-200"
                    text={"Editar Perfil"} onClick={() => setProfileModal(true)} />
        }

    }

    return (

        <>

            <Card className="relative flex-col w-full justify-start items-start pb-6 border-b">

                <ProfileWallpaper backgroundUrl={profileData.background_url} />

                <div className="w-full flex justify-end mt-2 px-2 h-[44px]">
                    <FollowBtn />
                </div>

                <div className="mt-4 p-3 px-4 flex flex-col gap-2">

                    <div>
                        <TitleTag.Main className="text-2xl font-semibold">{profileData.nome}</TitleTag.Main>
                        <TitleTag.Normal className="text-base font-normal dark:text-gray-500 text-gray-500">@{profileData.username}</TitleTag.Normal>
                        <TitleTag.Parag className="mt-4">{profileData.texto_bio}</TitleTag.Parag>
                    </div>

                    <div>
                        <TitleTag.Normal className="">{""}</TitleTag.Normal>
                        <TitleTag.Normal className="text-gray-500 dark:text-gray-500">Entrou em {formatDate(profileData.data_criacao)}</TitleTag.Normal>
                    </div>


                    <Card className="gap-4">
                        <div className="text-gray-500 flex gap-1 hover:underline hover:decoration-white hover:cursor-pointer" onClick={() => nav(`${location.pathname}/following`)}>
                            <p className="dark:text-white text-black" >{following}</p>
                            <p>Seguindo</p>
                        </div>
                        <div className="text-gray-500 flex gap-1 hover:underline hover:decoration-white hover:cursor-pointer" onClick={() => nav(`${location.pathname}/followers`)}> 
                            <p className="dark:text-white text-black" >{followers}</p>
                            <p>Seguidores</p>
                        </div>
                    </Card>
                </div>

                <Avatar ProfileAvatarUrl={profileData.img_url} />

            </Card>
        </>
    )
}