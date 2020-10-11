import React, { useEffect, useState } from 'react'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'
import { format } from 'date-fns'

import { cloudFnGet } from '../../../requests'
import { covidApi } from '../../../requests/apiEndpoints'

const data = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
]

/**
 * @author zilahir
 * @function Root
 * */

const Root = () => {
	const [deaths, setDeaths] = useState([])
	const [cases, setCases] = useState([])
	const [recovered, setRecovered] = useState([])
	useEffect(() => {
		cloudFnGet(covidApi.getHistoricalData).then(result => {
			const formattedCases = Object.keys(result.data.timeline.cases).map(
				thisCase => ({
					totalCase: result.data.timeline.cases[thisCase],
					date: format(new Date(thisCase), 'yyyy-MM-dd'),
					deaths: result.data.timeline.deaths[thisCase],
				}),
			)
			setCases(formattedCases)
		})
	}, [])
	return (
		<div>
			{cases.length > 0 ? (
				<ResponsiveContainer width={880} height={400}>
					<AreaChart
						width={500}
						height={400}
						data={cases}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}
					>
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Area
							type="monotone"
							dataKey="totalCase"
							stroke="#ff9994"
							fill="#ff9994"
						/>
						<Area
							type="monotone"
							dataKey="deaths"
							stroke="#ff5048"
							fill="#ff5048"
						/>
					</AreaChart>
				</ResponsiveContainer>
			) : (
				<p>lofasz</p>
			)}
		</div>
	)
}

export default Root
