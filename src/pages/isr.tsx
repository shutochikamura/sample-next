// 型を利用するためにインポート
import { GetStaticPaths, NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import Sayhello from "./sayhello";

type ISRProps = {
    message: string,
}

const ISR: NextPage<ISRProps> = (props) => {
    const { message } = props

    const router = useRouter()
    if (router.isFallback) {
        // フォールバック用のページを返す
        return <div>Loading...</div>
    }

    // ページがリロードする
    const onSubmitReload = () => {
        router.reload()
    }
    // 前のページに戻る
    const onSubmitBack = () => {
        router.back()
    }
    // 遷移開始時のイベントを購読します
    const onSubmitChangeStart = () => {
        router.events.on('routeChangeStart', (url, { shallow }) => {
            // urlには遷移先のパスが与えられます。
            // shallowはシャロールーティング（パスのみが置き換わる遷移)の場合はtrueになります。
            console.log('url', url)
            console.log('shallow', shallow)
        })
    }
    // 遷移完了時のイベントを購読します。
    const onSubmitChangeComplete = () => {
        router.events.on('routeChangeComplete', (url, { shallow }) => {
            // urlには遷移先のパスが与えられます。
            // shallowはシャロールーティング（パスのみが置き換わる遷移)の場合はtrueになります。
            console.log('url', url)
            console.log('shallow', shallow)
        })
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>このページはISRによってビルド時に生成されたページです</p>
                <p>{message}</p>
                <Link 
                    href='/ssr'
                >
                    <a>Go To SSR</a>
                </Link>
                <Sayhello />
                <br />
                <button onClick={onSubmitReload}>Reload</button>
                <br />
                <button onClick={onSubmitBack}>Back</button>
                <br />
                <button onClick={onSubmitChangeStart}>Change Start</button>
                <br />
                <button onClick={onSubmitChangeComplete}>Change Complete</button>
            </main>
        </div>
    )
}

// getStaticPaths実行後にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps<ISRProps> = async (context) => {
    const timestamp = new Date().toLocaleString()
    const message = `${timestamp}にこのページのgetStaticPropsが実行されました`

    return {
        props: {
            message,
        },
        // ページの有効期限を秒単位で指定
        revalidate: 60,
    }
}

export default ISR