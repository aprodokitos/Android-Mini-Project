import promptSync from 'prompt-sync';
import axios from 'axios';

const prompt = promptSync();
const baseURL = "http://localhost:3000/members";  
const createURL = "http://localhost:3000/create-members";  // URL khusus untuk create member
console.log("Base URL:", baseURL);

async function createMember() {
    try {
        const name = prompt("Enter member name: ");
        const email = prompt("Enter member email: ");
        const membershipType = prompt("Enter membership type (silver/gold/bronze): ");
        const joinDate = prompt("Enter join date (YYYY-MM-DD): ");

        const response = await axios.post(createURL, {
            name,
            email,
            membership_type: membershipType,
            join_date: joinDate
        });

        console.log("Member created successfully:", response.data);
    } catch (error) {
        console.error("Error creating member:", error.message);
    }
}

async function getAllMembers() {
    try {
        const response = await axios.get(baseURL);
        console.log("All members:", response.data);
    } catch (error) {
        console.error("Error fetching members:", error.message);
    }
}

async function getMemberById() {
    try {
        const id = prompt("Enter member ID: ");
        const response = await axios.get(`${baseURL}/${id}`);
        console.log("Member details:", response.data);
    } catch (error) {
        console.error("Error fetching member:", error.message);
    }
}

async function updateMember() {
    try {
        const id = prompt("Enter member ID to update: ");
        const name = prompt("Enter new member name: ");
        const email = prompt("Enter new member email: ");
        const membershipType = prompt("Enter new membership type (bronze/silver/gold): ");
        const joinDate = prompt("Enter new join date (YYYY-MM-DD): ");

        const response = await axios.put(`${baseURL}/${id}`, {
            name,
            email,
            membership_type: membershipType,
            join_date: joinDate
        });

        console.log("Member updated successfully:", response.data);
    } catch (error) {
        console.error("Error updating member:", error.message);
    }
}

async function deleteMember() {
    try {
        const id = prompt("Enter member ID to delete: ");
        const response = await axios.delete(`${baseURL}/${id}`);
        console.log("Member deleted successfully:", response.data);
    } catch (error) {
        console.error("Error deleting member:", error.message);
    }
}

async function main() {
    while (true) {
        console.log("\nGym Membership CRUD Operations:");
        console.log("1. Create Member");
        console.log("2. Get All Members");
        console.log("3. Get Member by ID");
        console.log("4. Update Member");
        console.log("5. Delete Member");
        console.log("6. Exit");

        const choice = prompt("Choose an option (1-6): ");

        switch (choice) {
            case "1":
                await createMember();
                break;
            case "2":
                await getAllMembers();
                break;
            case "3":
                await getMemberById();
                break;
            case "4":
                await updateMember();
                break;
            case "5":
                await deleteMember();
                break;
            case "6":
                console.log("Exiting...");
                return;
            default:
                console.log("Invalid choice. Please select an option between 1 and 6.");
        }
    }
}

main();
