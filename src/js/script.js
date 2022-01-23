const dtls = JSON.parse(localStorage.getItem('datalists'))

dtls.forEach((a, b) => {
	/**
	 * @type {HTMLDataListElement}
	 */
	const el = document.getElementById(a.shift());
	[ ...new Set(a) ].forEach(c => {
		el.innerHTML += `<option value=${c} />`
	})
})

document.addEventListener('click', e => {
	if (e.target.classList.contains('product-card__dec')) {
		const el = e.target.parentElement.children[ 1 ].textContent
		if (+el > 0) {
			e.target.parentElement.children[ 1 ].textContent = +el - 1
		}
	}
	if (e.target.classList.contains('product-card__inc')) {
		const el = e.target.parentElement.children[ 1 ].textContent
		e.target.parentElement.children[ 1 ].textContent = +el + 1
	}
	if (e.target.closest('.form-checkout__label._select')) {
		document.querySelector('.form-checkout__select-btn._icon-arrow-down').classList.toggle('_active')
		document.querySelector('.form-checkout__select-list').classList.toggle('_open')
	}
	if (e.target.classList.contains('form-checkout__select-item')) {
		const item = document.querySelector('.form-checkout__select-label')
		item.textContent = e.target.textContent
		item.style.color = '#333'
	}
})

/**
 * @type {HTMLFormElement}
 */
const formEl = document.querySelector('.form-checkout')

formEl.addEventListener('submit', e => {
	e.preventDefault()
	if (e.target.elements.snt.checked) {
		let obj = JSON.parse(localStorage.getItem('datalists'))
		if (obj) {
			let values = [ ...e.target.elements ].map(a => {
				if (a.value && a.getAttribute('list')) {
					return [ a.value ]
				}
			}).filter(a => a)
			obj = obj.map((a, b) => {
				return [ ...a, ...values[ b ] ]
			})
		} else {
			obj = [ ...e.target.elements ].map(i => {
				if (i.value && i.getAttribute('list')) {
					return [ i.getAttribute('list'), i.value ]
				}
			})
		}
		localStorage.setItem('datalists', JSON.stringify(obj.filter(a => a)))
	}
	location.reload()
})
