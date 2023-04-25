import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();

    return (
        <div className={"min-vh-100 bg-danger d-flex justify-content-center"}>
            <div className={"m-auto"}>
                <h1>Test {router.query.currentIndex}</h1>
            </div>
        </div>
    )
}
