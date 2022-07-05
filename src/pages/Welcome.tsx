import React from 'react'
import { history, setLocale, FormattedMessage } from 'umi'

const Welcome: React.FC = () => {

    return <h1>
        Welcome
        <button onClick={() => {
            history.push({
                pathname: '/home',
                query: {
                    a: 'b',
                },
            })
        }}>go home</button>
        <p><FormattedMessage id="index.start" /></p>
        <button onClick={() => {
            setLocale('zh-CN', false)
        }} >中文</button>
        <button onClick={() => {
            setLocale('en-US', false);
        }} >英文</button>
    </h1>
}

export default Welcome