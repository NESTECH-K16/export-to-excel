import api from './header.js'

const tableElm = document.querySelector('#info')
const bodyOfTableElm = tableElm.querySelector('tbody')
const noData = document.createElement('tr')
const divNodata = document.createElement('div')
const tdWithColspan = document.createElement('td')

tdWithColspan.colSpan = 7
divNodata.innerText = 'Vui lòng chọn file để hiển thị dữ liệu.'
divNodata.style.cssText = `display:flex; justify-content: center; align-items: center; padding: 40px`

noData.appendChild(tdWithColspan)
tdWithColspan.appendChild(divNodata)
bodyOfTableElm.appendChild(noData)

const convertXlsxToJson = (file) => {
	try {
		const reader = new FileReader()
		reader.readAsBinaryString(file)
		reader.onload = (e) => {
			const workbook = XLSX.read(e.target.result, {
				type: 'binary',
			})
			let result = {}

			workbook.SheetNames.forEach((sheetName) => {
				const row = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

				result[sheetName] = row
			})

			console.log('result', result)

			const infoOfK16 = result['K16']
			console.log('result', result[`K16`])
			// const infoTeacher = infoOfK16.slice(0, 2) // không cần thiết

			const infoElm = document.querySelector('.info')

			const infoTeacher = infoOfK16[0] // không cần thiết
			const nameElm = document.querySelector('.info__teacher-name')
			const dateOfOpeningSchoolElm = document.querySelector('.info__teacher-date')
			const dataNeeded = Object.entries(infoTeacher).slice(0, 2)

			infoElm.classList.add('open')
			nameElm.innerHTML = dataNeeded[0][0]
			dateOfOpeningSchoolElm.innerHTML = dataNeeded[1][0]

			const infoOfStudents = infoOfK16.slice(2, 21) // Data cua hoc sinh tru 2 dong dau laf thong tin giao vien vag ngay khai giang
			let allStudentUpdated = []

			for (const student of infoOfStudents) {
				const detailsOfStudent = Object.keys(student)

				let allStudentObjUpdated = []
				console.log('detailsOfStudent', detailsOfStudent)
				for (const key of detailsOfStudent) {
					const splitStrOfKey = key.split('_')
					const lastOfSplitStr = splitStrOfKey[splitStrOfKey.length - 1]

					if (lastOfSplitStr <= 6 || lastOfSplitStr === 'EMPTY') {
						allStudentObjUpdated.push(student[key])
					}
				}
				allStudentUpdated.push(allStudentObjUpdated)
			}
			const tableElm = document.querySelector('#info')
			const bodyOfTableElm = tableElm.querySelector('tbody')
			allStudentUpdated.map((student) => {
				const row = document.createElement('tr')
				for (const info of student) {
					const td = document.createElement('td')
					td.textContent = info
					row.appendChild(td)
				}
				bodyOfTableElm.appendChild(row)
			})
		}

		// show to html
	} catch (err) {
		console.log('err', err)
	}
}

const chooseFileElm = document.querySelector('#choose-file')

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

// const tableGetByJquery = $('#info')
// console.log('tableGetByJquery', tableGetByJquery)

// $('#info').on('click', () => {
// 	alert('Handler for `click` called.')
// })

console.log('api', api)

