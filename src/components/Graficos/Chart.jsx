import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import useGet from "../../hooks/useGet";
import axios from "../../config/axios";
import { parse, format } from 'date-fns';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

function parseFecha(fechaStr) {
	const parsedDate = parse(fechaStr, "eeee dd 'De' MMM 'De' yyyy, HH:mm:ss", new Date());

	if (isNaN(parsedDate.getTime())) {
		throw new Error("Fecha inválida: " + fechaStr);
	}

	return format(parsedDate, "dd/MM/yyyy, HH:mm:ss");
}

const Column = () => {
	const [reportes, setReportes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReportes = async () => {
			try {
				const {data} = await axios.get("/reportes/listar");
				setReportes(data.reportes);
				setLoading(false);
			} catch (error) {
				console.log("Error al obtener los reportes:", error);
				setLoading(false);
			}
		};

		fetchReportes();
	}, []);



	const data1 = reportes.map((reporte) => ({
		x: "FECHA",
		y: reporte.numero,
	}));
console.log(data1)



	return (
		<div className='control-pane'>
			<style>{SAMPLE_CSS}</style>
			<div className='control-section'>
				<ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{ labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45 : 0, valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} primaryYAxis={{ title: 'Medal Count', majorTickLines: { width: 0 }, lineStyle: { width: 0 }, maximum: 500, interval: 100 }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, header: "<b>${point.tooltip}</b>", shared: true }} width={Browser.isDevice ? '100%' : '75%'} title='Olympic Medal Counts - RIO'>
					<Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel, Highlight]} />
					<SeriesCollectionDirective>
						<SeriesDirective dataSource={data1} tooltipMappingName='toolTipMappingName' xName='x' columnSpacing={0.1} yName='y' name='REPORTES' type='Column' />
					</SeriesCollectionDirective>
				</ChartComponent>
			</div>
		</div>
	);
};

export default Column;
