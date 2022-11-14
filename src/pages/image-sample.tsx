import { NextPage } from "next";
import Image from "next/image";
// 画像ファイルをインポートする
import BibleImage from '../../public/images/nc202195.png'

const ImageSample: NextPage<void> = (props) => {
    return (
        <div>
            <h1>画像表示の比較</h1>
            <p>imgタグで表示した場合</p>
            <img src="/images/nc202195.png" placeholder="blur" />
            <p>Imageコンポーネントで表示した場合</p>
            <Image src={BibleImage} placeholder="empty" />
            <p>Imageで表示した場合は事前に描画エリアが確保されます</p>
        </div>
    )
}

export default ImageSample