const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

// ============ DONORS API ============
export async function fetchDonors() {
  console.log('API URL being used:', apiUrl);
  const res = await fetch(`${apiUrl}/donors`);
  console.log('Response status:', res.status);
  if (!res.ok) throw new Error('Failed to fetch donors');
  const data = await res.json();
  console.log('API response data length:', data ? data.length : 'No data');
  return data;
}

export async function fetchDonorById(id) {
  const res = await fetch(`${apiUrl}/donors/${id}`);
  if (!res.ok) throw new Error('Failed to fetch donor');
  return res.json();
}

export async function addDonor(donor) {
  const res = await fetch(`${apiUrl}/donors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donor),
  });
  if (!res.ok) throw new Error('Failed to add donor');
  return res.json();
}

export async function updateDonor(id, donor) {
  const res = await fetch(`${apiUrl}/donors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donor),
  });
  if (!res.ok) throw new Error('Failed to update donor');
  return res.json();
}

export async function deleteDonor(id) {
  const res = await fetch(`${apiUrl}/donors/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error('Failed to delete donor');
  return res.json();
}

export async function searchDonorsByBloodType(bloodType) {
  const res = await fetch(`${apiUrl}/donors/search/bloodtype/${bloodType}`);
  if (!res.ok) throw new Error('Failed to search donors');
  return res.json();
}

export async function getDonorStats() {
  const res = await fetch(`${apiUrl}/donors/stats/summary`);
  if (!res.ok) throw new Error('Failed to fetch donor stats');
  return res.json();
}

// ============ REQUESTS API ============
export async function fetchRequests() {
  const res = await fetch(`${apiUrl}/requests`);
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
}

export async function fetchRequestById(id) {
  const res = await fetch(`${apiUrl}/requests/${id}`);
  if (!res.ok) throw new Error('Failed to fetch request');
  return res.json();
}

export async function addRequest(request) {
  const res = await fetch(`${apiUrl}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) throw new Error('Failed to add request');
  return res.json();
}

export async function updateRequest(id, request) {
  const res = await fetch(`${apiUrl}/requests/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) throw new Error('Failed to update request');
  return res.json();
}

export async function deleteRequest(id) {
  const res = await fetch(`${apiUrl}/requests/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error('Failed to delete request');
  return res.json();
}

export async function fetchPendingRequests() {
  const res = await fetch(`${apiUrl}/requests/filter/pending`);
  if (!res.ok) throw new Error('Failed to fetch pending requests');
  return res.json();
}

export async function getRequestStats() {
  const res = await fetch(`${apiUrl}/requests/stats/summary`);
  if (!res.ok) throw new Error('Failed to fetch request stats');
  return res.json();
}

// ============ INVENTORY API ============
export async function fetchInventory() {
  const res = await fetch(`${apiUrl}/inventory`);
  if (!res.ok) throw new Error('Failed to fetch inventory');
  return res.json();
}

export async function fetchInventoryByBloodType(bloodType) {
  const res = await fetch(`${apiUrl}/inventory/${bloodType}`);
  if (!res.ok) throw new Error('Failed to fetch inventory for blood type');
  return res.json();
}

export async function addInventory(inventoryData) {
  const res = await fetch(`${apiUrl}/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventoryData),
  });
  if (!res.ok) throw new Error('Failed to add inventory');
  return res.json();
}

export async function updateInventory(bloodType, units) {
  const res = await fetch(`${apiUrl}/inventory/${bloodType}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ units }),
  });
  if (!res.ok) throw new Error('Failed to update inventory');
  return res.json();
}

export async function useInventory(bloodType, units) {
  const res = await fetch(`${apiUrl}/inventory/${bloodType}/use`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ units }),
  });
  if (!res.ok) throw new Error('Failed to use inventory');
  return res.json();
}

export async function getLowStockAlerts(threshold = 30) {
  const res = await fetch(`${apiUrl}/inventory/alerts/low-stock?threshold=${threshold}`);
  if (!res.ok) throw new Error('Failed to fetch low stock alerts');
  return res.json();
}

export async function getExpiringBatches(days = 7) {
  const res = await fetch(`${apiUrl}/inventory/alerts/expiring?days=${days}`);
  if (!res.ok) throw new Error('Failed to fetch expiring batches');
  return res.json();
}

export async function initializeInventory() {
  const res = await fetch(`${apiUrl}/inventory/initialize`, {
    method: "POST",
  });
  if (!res.ok) throw new Error('Failed to initialize inventory');
  return res.json();
}

// ============ DRIVES API ============
export async function fetchDrives() {
  const res = await fetch(`${apiUrl}/drives`);
  if (!res.ok) throw new Error('Failed to fetch drives');
  return res.json();
}

export async function fetchDriveById(id) {
  const res = await fetch(`${apiUrl}/drives/${id}`);
  if (!res.ok) throw new Error('Failed to fetch drive');
  return res.json();
}

export async function addDrive(drive) {
  const res = await fetch(`${apiUrl}/drives`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(drive),
  });
  if (!res.ok) throw new Error('Failed to add drive');
  return res.json();
}

export async function updateDrive(id, drive) {
  const res = await fetch(`${apiUrl}/drives/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(drive),
  });
  if (!res.ok) throw new Error('Failed to update drive');
  return res.json();
}

export async function deleteDrive(id) {
  const res = await fetch(`${apiUrl}/drives/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error('Failed to delete drive');
  return res.json();
}

export async function fetchUpcomingDrives() {
  const res = await fetch(`${apiUrl}/drives/filter/upcoming`);
  if (!res.ok) throw new Error('Failed to fetch upcoming drives');
  return res.json();
}

export async function getDriveStats() {
  const res = await fetch(`${apiUrl}/drives/stats/summary`);
  if (!res.ok) throw new Error('Failed to fetch drive stats');
  return res.json();
}
