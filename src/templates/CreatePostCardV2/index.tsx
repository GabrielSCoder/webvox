import React, { useRef, useState } from "react";
import { getUserByFilter } from "../../services/user";
import useDebounce from "../../hooks/useDebounce";
import {TagUserResult} from "./TagUserResult";
import Card from "../../components/Card";
import { CountChars } from "../../components/CountChars";
import Button from "../../components/Button";
import TitleTag from "../../components/TitleTags";
import { sendPostAsync } from "../../services/post";
import LoadingPageTemplate from "../LoadingPage";
import classNames from "../../utils/classNames";

type props = {
    userData: any
    getDataWithUser : any
}

export default function HighlightTextarea(props: props) {

    const [cursorPos, setCursorPos] = useState({ top: 0, left: 0 });
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false)
    const [expand, setExpand] = useState(false)
    const [txt, setTxt] = useState("");
    const [val, setVal] = useState(0)
    const charactersLimit = 150
    const { userData, getDataWithUser } = props
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);


    const formatText = (input: string) => {
        return input
            .replace(/(@[a-zA-Z0-9][a-zA-Z0-9_]*|#[a-zA-Z0-9][a-zA-Z0-9_]*)/g, '<span class="text-blue-500">$&</span>')
            .replace(/\n/g, "<br>");
    };

    const extractSearchTerm = (text: string): string | null => {
        const match = text.match(/@([a-zA-Z0-9][a-zA-Z0-9_]*)$/);
        return match ? match[1] : null;
    };

    const searchUsers = async (query: string) => {
        if (!query) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const resp = await getUserByFilter({ search: query, tamanhoPagina: 5, pagina: 1 });
        if (resp.data.success) {
            setSearchResults(resp.data.dados);
            setShowResults(true);
        }
    };

    const handleDebouncedSearch = useDebounce(searchUsers, 500);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const lines = value.split("\n");

        if (lines.length > 8) {
            return;
        }
        setTxt(value);
        setVal(value.trim().length);

        const textarea = e.target;
        const selectionStart = textarea.selectionStart;

        const div = document.createElement("div");
        const computedStyle = window.getComputedStyle(textarea);

        Object.assign(div.style, {
            position: "absolute",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            fontSize: computedStyle.fontSize,
            fontFamily: computedStyle.fontFamily,
            fontWeight: computedStyle.fontWeight,
            letterSpacing: computedStyle.letterSpacing,
            width: computedStyle.width,
            padding: computedStyle.padding,
            border: computedStyle.border,
            lineHeight: computedStyle.lineHeight,
            top: `${textarea.offsetTop}px`,
            left: `${textarea.offsetLeft}px`,
            visibility: "hidden",
            overflow: "hidden" 
        });

        document.body.appendChild(div);

        div.textContent = value.substring(0, selectionStart);

        const marker = document.createElement("span");
        marker.textContent = "|";
        div.appendChild(marker);

        const rect = marker.getBoundingClientRect();
        const textareaRect = textarea.getBoundingClientRect();

        document.body.removeChild(div);

  
        setCursorPos({
            top: textareaRect.top + (rect.top - textareaRect.top) - textarea.scrollTop + 110, 
            left: textareaRect.left + (rect.left - textareaRect.left) - 20
        });

        const searchTerm = extractSearchTerm(value);
        if (searchTerm) {
            handleDebouncedSearch(searchTerm);
        } else {
            setSearchResults([]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const lines = txt.split("\n");

        if (e.key === "Enter" && lines.length >= 8) {
            e.preventDefault();
        }
    };


    const handleUserSelect = (username: string) => {
        setTxt((prevTxt) => prevTxt.replace(/@[a-zA-Z]*$/, `@${username} `));
        setShowResults(false);
    };

    const handlePost = async () => {

        const resp = await sendPostAsync({ tipo: "feed", conteudo: txt, usuario_id: userData.id })

        if (resp.data.success) {
            setTxt("")
        }

    }

    const delayPost = async () => {
        setLoading(true)
        const delay = new Promise(resolve => setTimeout(resolve, 2000))
        await Promise.all([delay, handlePost()])
        await getDataWithUser()
    }


    return (

        <div className={classNames("relative w-full px-2 ", !expand ? userData.img_url ? "h-[170px]" : "h-[150px]" : "h-[330px]")}>

            {loading ? (
                <LoadingPageTemplate className="w-full h-[320px]" />
            ) : (
                <>
                    <Card className="relative flex justify-start items-center gap-4 p-2 ">
                        {userData.img_url ? (
                            <div className="relative rounded-full h-[50px] w-[50px] bg-black border m-2 ">
                                <img src={userData.img_url} className="h-full w-full rounded-full object-cover" />
                            </div>
                        ) : (
                            <div className="relative bg-red-500 rounded-full p-4 h-[50px] w-[50px]"></div>
                        )}
                        <TitleTag.Sub className="relative">{userData.username}</TitleTag.Sub>
                    </Card>

                    <div className="relative w-full">
                        <div className="absolute inset-0 whitespace-pre-wrap break-words text-white bg-black p-2 pointer-events-none"
                            dangerouslySetInnerHTML={{ __html: formatText(txt) }}
                        />

                        <h2 className="absolute inset-0 whitespace-pre-wrap break-words text-gray-500 bg-black p-2 pointer-events-none" hidden={txt.trim().length > 0 || expand}>Digite algo</h2>

                        <textarea
                            ref={textareaRef}
                            className="text-white resize-none w-full bg-transparent p-2 border-gray-500 relative focus:outline-none"
                            rows={expand ? 8 : 1}
                            value={txt}
                            maxLength={200}
                            onChange={handleChange}
                            style={{ color: "transparent", caretColor: "white" }}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setExpand(true)}
                            onBlur={() => {txt.trim().length < 1 ? setExpand(false) : undefined}}
                        />
                    </div>

                    <TagUserResult data={searchResults} state={showResults} onSelect={handleUserSelect} position={cursorPos} />

                    <p className="relative border-b border-gray-800"></p>

                    <Card className={classNames("justify-end items-center gap-4 px-2", expand ? "mt-1" : "mt-2")}>
                        <CountChars data={val} max={charactersLimit} />
                        <Button text="Post" onClick={() => delayPost()} type="submitt" disabled={txt.trim().length < 1 || val > charactersLimit} className="relative px-4" />
                    </Card>
                </>
            )}
        </div>
    );
}
