import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPageTemplate from "../../templates/LoadingPage";
import { IoIosHeart } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";
import useNotifications from "../../hooks/useNotifications";
import React from "react";
import { ctx } from "../../contexts/NotifyContext";

export default function Notifications() {

    const location = useLocation();
    const id = location.state.id;
    const user = location.state.username;
    const nav = useNavigate()
    const { notifyData, loading, getData, confirmNotify } = useNotifications()
    const { setNotifications } = useContext(ctx)

    const btn = (event: React.MouseEvent, username: string) => {
        event.stopPropagation()
        nav("/" + username)
    }

    useEffect(() => {
        getData(id);
    }, []);

    useEffect(() => {
        const confirm = async () => {
            const resp = await confirmNotify(true, id)
            if (resp.data.success) {
                setNotifications(0)
            }
        }

        confirm()

    }, [notifyData.length > 0])


    if (loading) {
        return <LoadingPageTemplate className="h-full w-full" />;
    }

    return (
        <div className="h-full w-full">
            <h2 className="text-white text-xl font-bold mb-4 p-2">Notificações</h2>
            {notifyData.map((notification: any, index) => (
                <div key={index} className="border-b border-t border-gray-500 h-[120px] text-white flex items-center gap-4 hover:cursor-pointer hover:bg-gray-800 px-2"
                    onClick={notification.tipo === "like" || notification.tipo === "reply" ? () => { nav(`/${user}/post/${notification.post_id}`) } : undefined}
                >

                    {notification.tipo === "follow" && (
                        <div className="flex items-start gap-6">
                            <div className="mt-2">
                                <AiOutlineUserAdd className="text-white" size={30} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <img
                                    key={index}
                                    src={notification.usuario.img_url}
                                    alt={notification.usuario.nome}
                                    className="w-10 h-10 rounded-full border-1 border-gray-200"
                                />
                                <p className=""><span className="hover:underline hover:decoration-white" onClick={e => btn(e, notification.usuario.username)}>{notification.usuario.nome}</span> seguiu você</p>
                            </div>
                        </div>

                    )}

                    {notification.tipo === "like" && (
                        <div className="flex items-start gap-1">

                            <div className="mt-2">
                                <IoIosHeart size={30} className="text-rose-600 mr-6" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap gap-2 -space-x-2 items-center">
                                    {notification.usuarios.slice(0, 10).map((user: any, idx: number) => (
                                        <img
                                            key={idx}
                                            src={user.img_url}
                                            alt={user.nome}
                                            className="w-10 h-10 rounded-full border-1 border-gray-200 object-cover"
                                        />
                                    ))}
                                </div>
                                <p>
                                    {notification.usuarios.length === 1 ? (
                                        <>
                                            <span className="font-bold hover:underline hover:decoration-white" onClick={e => btn(e, notification.usuarios[0].username)}>
                                                {notification.usuarios[0].nome}
                                            </span> curtiu seu post
                                        </>
                                    ) : notification.usuarios.length <= 3 ? (
                                        <>
                                            {notification.usuarios.map((u: any, idx: number) => (
                                                <span key={idx} className="font-bold hover:underline hover:decoration-white" onClick={e => btn(e, u.username)}>
                                                    {u.nome}
                                                </span>
                                            )).map((item: any, index: number, array: any) => (
                                                <React.Fragment key={index}>
                                                    {item}
                                                    {index < array.length - 1 && ", "}
                                                </React.Fragment>
                                            ))} curtiram seu post
                                        </>
                                    ) : (
                                        <>
                                            {notification.usuarios.slice(0, 2).map((u: any, idx: number) => (
                                                <span key={idx} className="font-bold hover:underline hover:decoration-white" onClick={e => btn(e, u.username)}>
                                                    {u.nome}
                                                </span>
                                            )).map((item: any, index: number, array: any) => (
                                                <React.Fragment key={index}>
                                                    {item}
                                                    {index < array.length - 1 && ", "}
                                                </React.Fragment>
                                            ))}
                                            e outras <span className="font-bold text-red-400">{notification.usuarios.length - 2}</span> pessoas curtiram seu post
                                        </>
                                    )}
                                </p>

                            </div>



                        </div>
                    )}

                    {notification.tipo === "reply" && (
                        <div className="flex items-start gap-1">

                            <div className="mt-2">
                                <CiChat1 size={30} className="text-white mr-6" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap gap-2 -space-x-2 items-center">
                                    {notification.usuarios.slice(0, 10).map((user: any, idx: number) => (
                                        <img
                                            key={idx}
                                            src={user.img_url}
                                            alt={user.nome}
                                            className="w-10 h-10 rounded-full border-1 border-gray-200 object-cover"
                                        />
                                    ))}
                                </div>
                                <p>
                                    {notification.usuarios.length === 1 ? (
                                        <>
                                            <span className="font-bold hover:underline hover:decoration-white" onClick={e => btn(e, notification.usuarios[0].username)}>
                                                {notification.usuarios[0].nome}
                                            </span> comentou no seu post
                                        </>
                                    ) : notification.usuarios.length <= 3 ? (
                                        <>
                                            {notification.usuarios.map((u: any, idx: number) => (
                                                <span key={idx} className="font-bold hover:underline hover:decoration-white" onClick={e => btn(e, u.username)}>
                                                    {u.nome}
                                                </span>
                                            )).map((item: any, index: number, array: any) => (
                                                <React.Fragment key={index}>
                                                    {item}
                                                    {index < array.length - 1 && ", "}
                                                </React.Fragment>
                                            ))} comentaram no seu post
                                        </>
                                    ) : (
                                        <>
                                            {notification.usuarios.slice(0, 2).map((u: any, idx: number) => (
                                                <span key={idx} className="font-bold hover:underline hover:decoration-white" onClick={e => btn(e, u.username)}>
                                                    {u.nome}
                                                </span>
                                            )).map((item: any, index: number, array: any) => (
                                                <React.Fragment key={index}>
                                                    {item}
                                                    {index < array.length - 1 && ", "}
                                                </React.Fragment>
                                            ))}
                                            e outras <span className="font-bold text-red-400">{notification.usuarios.length - 2}</span> pessoas comentaram no seu post
                                        </>
                                    )}
                                </p>

                            </div>



                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
