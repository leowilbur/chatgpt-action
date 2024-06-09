const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.json({
        success: true,
    })
});

app.use(express.static('public'));

// Sample data
const services = [
    {
        location: 'Toronto',
        serviceType: 'Sửa xe',
        vietnamese: 'Yes',
        name: 'Sửa Xe Toronto',
        phone: '416-555-0101',
        email: 'suaxetoronto@gmail.com',
        website: 'www.suaxetoronto.ca',
        intro: 'Chuyên sửa chữa xe hơi với giá cả phải chăng và dịch vụ tận tâm.',
        discount: 'Giảm giá 10% lần đầu'
    },
    {
        location: 'Toronto',
        serviceType: 'Hớt tóc',
        vietnamese: 'Yes',
        name: 'Tiệm Tóc Toronto',
        phone: '416-555-0202',
        email: 'tiemtoctoronto@gmail.com',
        website: 'www.tiemtoctoronto.ca',
        intro: 'Cắt tóc chuyên nghiệp cho mọi lứa tuổi, phong cách hiện đại.',
        discount: 'Giảm 15% cho học sinh'
    },
    // Add more service entries from the given data...
    {
        location: 'Vancouver',
        serviceType: 'Bán nhà',
        vietnamese: 'Yes',
        name: 'Bất Động Sản Van',
        phone: '604-555-0606',
        email: 'bds@batdongsanvan.com',
        website: 'www.batdongsanvan.com',
        intro: 'Chuyên cung cấp dịch vụ tư vấn và mua bán bất động sản chuyên nghiệp.',
        discount: 'Miễn phí khảo sát nhà'
    }
];


// List all services, optionally filtered by location, serviceType, and vietnamese
app.get('/services', (req, res) => {
    const { location, serviceType, vietnamese } = req.query;
    let filteredServices = services;

    if (location) {
        filteredServices = filteredServices.filter(service => service.location.toLowerCase() === location.toLowerCase());
    }

    if (serviceType) {
        filteredServices = filteredServices.filter(service => service.serviceType.toLowerCase() === serviceType.toLowerCase());
    }

    if (vietnamese) {
        filteredServices = filteredServices.filter(service => service.vietnamese.toLowerCase() === vietnamese.toLowerCase());
    }

    res.json(filteredServices);
});

// Get details of a specific service by name
app.get('/services/:serviceName', (req, res) => {
    const { serviceName } = req.params;
    const service = services.find(service => service.name.toLowerCase() === serviceName.toLowerCase());

    if (service) {
        res.json(service);
    } else {
        res.status(404).json({ code: 404, message: 'Service not found' });
    }
});


app.get('*', (req, res) => {
    res.status(200).json({ success: true });

})
const port = (process.env.PORT || 3000)
console.log("Listen " + port)
app.listen(port)