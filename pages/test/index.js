import React from 'react'
import Icon from '@ant-design/icons';
import Image from 'next/image'

function Cardbox({ title, icon }) {
    return (
        <>
            <div style={{ border: "2px solid transparent", height: '15em', width: '25%', borderRadius: "10px", backgroundColor: "#ecae3c53",display:'flex',flexDirection:"column",justifyContent:"center" }}>
                <Icon component={()=><img src={"https://pacymedia.com/wp-content/uploads/2019/08/SEO-Ranking-Factor-2019-1.jpg"} style={{width:'80%' ,height:"80%",borderRadius:'10px'}} />} />
            </div>
            <a style={{fontWeight:"bold"}}>{title}</a>
        </>
    )
}

export default Cardbox
