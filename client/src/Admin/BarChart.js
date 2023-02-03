import React from 'react'
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale} from 'chart.js'
import { Bar } from "react-chartjs-2"
import { useEffect, useState } from 'react'
import axios from 'axios'

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement
)
const BarChart = ({chart}) => {
     let d = new Date()
     let month = ["", "jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
    var data = {
        // labels: chart.map((item) => {
        //     let date = item.createdAt.slice(6,7)
        //     let m = month[date]
        //     return m
           
        // }),
        labels: [],
        datasets: [{
            label: `orders`,
            data: chart.reduce((acc,item) => { 
                
                    let date = item.createdAt.slice(6,7)
                    let m = month[date] + " " + d.getFullYear()
                
                    if(acc[m]){
                        acc[m] += item.amount
                    }else{
                        acc[m] = item.amount
                    }

                    
                    return acc  

                },{} ),
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(255, 159, 64)',
                'rgba(255, 205, 86)',
                'rgba(75, 192, 192)',
                'rgba(54, 162, 235)',
                'rgba(153, 102, 255)',
                'rgba(201, 203, 207)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 2
        }]
      };
      var options = {
        maintainAspectRatio : true,
        scales: {
            y: {
                beginAtZero : true
            }
        },
        legend :{
            labels:{
                font:  {
                    size: 67
                }
            },
            layout: {
                padding: 20
            }
        }
    };
  return (
    <div>
        <Bar
            height={100}
            
            data = {data}
            options={options}
        />
    </div>
  )
}

export default BarChart

// chart.map(item => {
//     let month = ["", "jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
//      let m =item.createdAt.slice(6,7)
//      let ok = month[m] + ' ' + m
//     return ok})