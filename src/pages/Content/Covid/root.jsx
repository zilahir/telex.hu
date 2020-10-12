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
import styles from './root.module.scss'

/**
 * @author zilahir
 * @function Root
 * */

const Root = () => {
	const [cases, setCases] = useState([])
	useEffect(() => {
		cloudFnGet(covidApi.getHistoricalData).then(result => {
			const formattedCases = Object.keys(result.data.timeline.cases).map(
				thisCase => ({
					totalCase: result.data.timeline.cases[thisCase],
					date: format(new Date(thisCase), 'MM-dd'),
					deaths: result.data.timeline.deaths[thisCase],
					recovered: result.data.timeline.recovered[thisCase],
				}),
			)
			setCases(formattedCases)
		})
	}, [])

	const YAxisTick = () => (
		<div className={styles.yAxisTick}>
			<p>lofasz</p>
		</div>
	)
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
						<YAxis
							tickFormatter={value => `${value / 1000} K`}
							tick={<YAxisTick />}
						/>
						<Tooltip />
						<Area
							type="monotone"
							dataKey="deaths"
							stroke="#ff5048"
							fill="#ff5048"
						/>
						<Area
							type="monotone"
							dataKey="totalCase"
							stroke="#ff9994"
							fill="#ff9994"
						/>
						<Area
							type="monotone"
							dataKey="recovered"
							stroke="#8be28b"
							fill="#8be28b"
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
