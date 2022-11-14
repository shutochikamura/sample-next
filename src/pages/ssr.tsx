// 型を利用するためにインポート
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

type SSRProps = {
    message: string,
}

const SSR: NextPage<SSRProps> = (props) => {
    const { message } = props

    const router = useRouter()
    const onSubmit = () => {
        router.push('/isr')

        // 文字列の代わりにオブジェクトで指定できます。
        // /isr?keyword=helloへ遷移します。
        // router.push({
        //     pathname: 'isr',
        //     query: { keyword: 'hello' },
        // })
    }
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>このページはサーバーサイドレンダリングによってアクセス時にサーバーで描画されたページです</p>
                <p>{message}</p>
                <Link
                    href={{ 
                        pathname: '/ssg',
                        query: { keyword: 'hello' },
                    }}
                >
                    <a>Go To SSG</a>
                </Link>
                <br />
                <button onClick={onSubmit}>Go To ISR(onCLick)</button>
            </main>
        </div>
    )
}

// getServerSidePropsはページへのリクエストがある度に実行される
export const getServerSideProps: GetServerSideProps<SSRProps> = async (
    context
) => {
    const timestamp = new Date().toLocaleString()
    const message = `${timestamp}にこのページのgetServerSidePropsが実行されました`
    console.log(message)

    return {
        props: {
            message,
        }
    }
}

export default SSR