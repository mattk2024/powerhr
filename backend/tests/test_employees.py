import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.asyncio
async def test_create_employee(client: AsyncClient):
    payload = {
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane@example.com",
        "position": "Engineer",
        "hire_date": "2024-01-15",
    }
    response = await client.post("/api/v1/employees/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["first_name"] == "Jane"
    assert data["email"] == "jane@example.com"


@pytest.mark.asyncio
async def test_list_employees(client: AsyncClient):
    response = await client.get("/api/v1/employees/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
