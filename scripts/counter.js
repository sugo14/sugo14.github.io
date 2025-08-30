// var t = setInterval(function() {
//     if (window.goatcounter && window.goatcounter.visit_count) {
//         clearInterval(t);
//         console.log("WOOOHOOO!");
//         window.goatcounter.visit_count({
//             type: 'html',
//             append: '#view-count',
//             style: 'border: none;'
//         });
//     }
// }, 100);
var r = new XMLHttpRequest();
r.addEventListener('load', function() {
    document.querySelector('#view-count-value').innerText = JSON.parse(this.responseText).count
})
r.open('GET', 'https://sugo14.goatcounter.com/counter/' + '.json')
r.send()
// var t = setInterval(function() {
//     if (window.goatcounter && window.goatcounter.visit_count) {
//         clearInterval(t);
//         window.goatcounter.visit_count({
//             type: 'html',
//             append: '#view-count-value',
//             no_branding: true,
//             style: 'border: none;'
//         });
//     }
// }, 100);
