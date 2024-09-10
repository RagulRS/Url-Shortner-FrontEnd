import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Table, Alert, Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Home = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const [urlData, setUrlData] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await api.get('/api/url');
                setUrls(response.data);
                // Prepare data for chart
                const data = response.data.map(url => ({
                    name: url.shortUrl,
                    clicks: url.clickCount,
                }));
                setUrlData(data);
            } catch (err) {
                setError('Failed to fetch URLs');
            }
        };

        fetchUrls();
    }, []);

    const handleCreateUrl = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
            await api.post(
                '/api/url',
                { originalUrl },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOriginalUrl('');
            alert('Short URL created!');
            window.location.reload();
        } catch (error) {
            setError('Failed to create short URL');
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center min-vh-100 bg-light py-5">
            <Card className="p-4 shadow-lg w-75" style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}>
                <Card.Body>
                    <h2 className="text-center mb-4" style={{ color: '#007bff' }}>Dashboard</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleCreateUrl} className="mb-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Original URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter original URL"
                                value={originalUrl}
                                onChange={(e) => setOriginalUrl(e.target.value)}
                                required
                                style={{ backgroundColor: '#e9ecef', borderColor: '#007bff' }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                            Create Short URL
                        </Button>
                    </Form>
                    <div className="mb-4">
                        <h3 className="text-center mb-3" style={{ color: '#007bff' }}>Short URLs and Click Counts</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Short URL</th>
                                    <th>Original URL</th>
                                    <th>Click Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {urls.map((url) => (
                                    <tr key={url._id}>
                                        <td><a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
                                        <td>{url.originalUrl}</td>
                                        <td>{url.clickCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <h3 className="text-center mb-3" style={{ color: '#007bff' }}>URL Click Statistics</h3>
                        <BarChart width={600} height={300} data={urlData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="clicks" fill="#007bff" />
                        </BarChart>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;
