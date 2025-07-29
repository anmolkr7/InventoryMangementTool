"""
Inventory Management Tool - API Test Script

This script is ready to test your Inventory Management Tool.

Requirements:
Python 3.6+
`requests` library

Setup Instructions:
1. Install Python dependencies:
   `pip install requests`

2. Make sure your Node.js server is running on port 5000.

3. Run the script from your terminal:
   `python test_api.py`
"""
import requests

BASE_URL = "http://localhost:5000" 

def print_result(test_name, passed, expected=None, got=None, request_data=None, response_body=None):
    """
    Prints test result.
    """
    if passed:
        print(f"{test_name}: PASSED")
    else:
        print(f"--- {test_name}: FAILED ---")
        if request_data:
            print(f" Request Data: {request_data}")
        if expected is not None and got is not None:
            print(f" Expected Status: {expected}, Got Status: {got}")
        if response_body:
            print(f" Response Body: {response_body}")
        print("----------------------")

def test_register_user():
    """
    Tests user registration.
    """
    # Corrected: Changed username to meet the minLength: 6 requirement.
    payload = {"username": "pujatest", "password": "mypassword"}
    res = requests.post(f"{BASE_URL}/register", json=payload)
    passed = res.status_code in [201, 409]
    print_result("User Registration", passed, "201 or 409", res.status_code, payload, res.text)

def test_login():
    """
    Tests user login.
    """
    # Corrected: Changed username to match the registration test.
    payload = {"username": "pujatest", "password": "mypassword"}
    res = requests.post(f"{BASE_URL}/login", json=payload)
    token = None
    passed = False
    if res.status_code == 200:
        try:
            token = res.json().get("access_token")
            passed = token is not None
        except Exception:
            passed = False
    print_result("User Login", passed, "200", res.status_code, payload, res.text)
    return token

def test_add_product(token):
    """
    Tests adding a product.
    """
    payload = {
        "name": "Phone",
        "type": "Electronics",
        "sku": "PHN-101",
        "image_url": "https://example.com/phone.jpg",
        "description": "Latest Phone",
        "quantity": 5,
        "price": 999.99
    }
    res = requests.post(f"{BASE_URL}/products", json=payload, headers={"Authorization": f"Bearer {token}"})
    
    product_id = None
    passed = res.status_code == 201
    if passed:
        try:
            product_id = res.json().get("product_id")
            passed = product_id is not None
        except Exception:
            passed = False
    print_result("Add Product", passed, "201", res.status_code, payload, res.text)
    return product_id

def test_update_quantity(token, product_id, new_quantity):
    """
    Tests updating the quantity for a specific product.
    """
    payload = {"quantity": new_quantity}
    res = requests.put(
        f"{BASE_URL}/products/{product_id}/quantity",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    passed = res.status_code == 200
    if passed:
        try:
            updated_info = res.json()
            updated_qty = updated_info.get("quantity")
            if updated_qty == new_quantity:
                print(f"Update Quantity: PASSED, Updated quantity is correct: {updated_qty}")
            else:
                print(f"Update Quantity: FAILED, Mismatched quantity. Expected: {new_quantity}, Got: {updated_qty}")
        except Exception:
            print("Update Quantity: FAILED, response body is not valid JSON or has wrong structure.")
    else:
        print_result("Update Quantity", False, 200, res.status_code, payload, res.text)

def test_get_products(token, expected_quantity):
    """
    Tests fetching the list of products and verifies the quantity of the test product.
    """
    res = requests.get(f"{BASE_URL}/products", headers={"Authorization": f"Bearer {token}"})

    if res.status_code != 200:
        print_result("Get Products", False, 200, res.status_code, None, res.text)
        return

    try:
        products = res.json()
    except Exception:
        print_result("Get Products", False, "valid JSON list", "Invalid JSON", None, res.text)
        return
    
    phone_products = [p for p in products if p.get("name") == "Phone"]
    if not phone_products:
        print_result("Get Products", False, "Product with name 'Phone' to be found", "Not Found", None, products)
        return

    phone_quantity = phone_products[0].get("quantity")
    if phone_quantity == expected_quantity:
        print(f"Get Products: PASSED (Verified quantity = {phone_quantity})")
    else:
        print_result("Get Products", False, f"Quantity to be {expected_quantity}", f"Got {phone_quantity}", None, products)

def run_all_tests():
    """
    Runs all tests in sequence.
    """
    print("--- Starting API Test Suite ---")
    test_register_user()
    
    token = test_login()
    if not token:
        print("\nLogin failed. Skipping further tests.")
        return

    product_id = test_add_product(token)
    if not product_id:
        print("\nProduct creation failed. Skipping further tests.")
        return
        
    new_quantity = 15
    test_update_quantity(token, product_id, new_quantity)
    test_get_products(token, expected_quantity=new_quantity)
    print("\n--- Test Suite Finished ---")

if __name__ == "__main__":
    run_all_tests()
