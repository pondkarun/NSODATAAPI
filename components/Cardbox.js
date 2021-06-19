import React from 'react'
import Icon from '@ant-design/icons';
import Image from 'next/image'

function Cardbox({ title, image }) {
    return (
        <>
            <div style={{display:"block",position:"relative",  border: "2px solid transparent", height: '15em', width: '100%', minWidth:"200px", minHeight:"200px", borderRadius: "10px", backgroundColor: "#F9EAC9",display:'flex',flexDirection:"column",justifyContent:"center" }}>
                <Icon component={()=><img src={image ? image:"https://www.researchgate.net/profile/Adugna-Oluma/publication/343381585/figure/fig1/AS:919995320111104@1596355385430/Pie-chart-illustrating-the-level-of-food-insecurity-among-the-respondents-among-people.png"} style={{width:'100%' ,height:"10em",borderRadius:'10px',alignSelf:"center",objectFit:"contain"}} />} />
            </div>
            <a style={{fontWeight:"bold"}}>{title}</a>
        </>
    )
}

export default Cardbox
