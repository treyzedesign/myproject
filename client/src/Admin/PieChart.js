import React from 'react'
import { ArcElement, Chart as chartjs, Legend, Title, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
chartjs.register(
    Tooltip, Title, ArcElement, Legend
)
const PieChart = ({alluser, allproduct, chart}) => {
    let user = Number(alluser)
    let prod = Number(allproduct)
    const data = {
        datasets :[{
            data: [user, prod, chart.length],
            backgroundColor: [
                'rgb(63, 175, 128)',
                'rgb(162, 179, 14)',
                'rgb(111, 111, 199)'
            ],
        }
    ],
       
        labels : [
            'Users',
            'Products',
            'Orders'
        ]
    }
    var options={
        // maintainAspectRatio : true,
        
    }
  return (
    <div className='text-center pie-chart'>
         <div style={{width:'90%', height: '50vh', position: 'relative', marginTop: "5vh"}}>
            <Pie data={data} options={options}/>         
        </div>
    </div>
   
  )
}

export default PieChart