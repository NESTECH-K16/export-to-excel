const convertXlsxToJson = (file) => {
	try {
		const reader = new FileReader()
		// console.log('reader', reader)
		reader.readAsBinaryString(file) // doc file duoi dang binary format
		reader.onload = (e) => {
			console.log('event onload reader', e.target.result)
			const workbook = XLSX.read(e.target.result, {
				type: 'binary',
			})
			let result = {}

			workbook.SheetNames.forEach((sheetName) => {
				console.log('sheetName', sheetName)
				console.log('workbook.Sheets', workbook.Sheets[sheetName])
				const row = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

				result[sheetName] = row
			})

			const resultElm = document.querySelector('#result')
			console.log('result', result)
			resultElm.innerText = JSON.stringify(result, null, 4)

			// const k16Data = result[`K16`]
			// console.log('k16Data', k16Data)
		}

		// show to html
	} catch (err) {}
}

const chooseFileElm = document.querySelector('#chooseFile')

const uploadFile = () => {
	const files = chooseFileElm.files
	console.log('files', files)
	if (files.length === 0) {
		alert(`Please choose file!`)
		return
	}
	const fileName = files[0].name
	console.log('fileName', fileName)

	const XLS = 'XLS',
		XLSX = 'XLSX'
	const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase()
	console.log('extension', extension)
	if (extension === XLS || extension === XLSX) {
		console.log('is excel file')
		convertXlsxToJson(files[0])
	} else {
		console.log('wrong file format')
	}
}

console.log('chooseFileElm', chooseFileElm)

// chooseFileElm.addEventListener('click', (e) => {
// 	console.log('event when put files', e.target.files)
// 	const files = e.target.files
// 	// if (files.length === 0) {
// 	// 	alert('no file')
// 	// } else {
// 	// 	alert(1)
// 	// }
// })

