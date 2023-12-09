using Npgsql;

namespace WebAPI
{
    public class LoginService
    {
        private string _connectionString;

        public void SetConnectionString(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void DatabaseConnection()
        {
            Thread.Sleep(1000);
            CheckLogin("example@email.com", "password123");
            RegisterUser("John", "Doe", "john.doe@email.com", "newpassword");
        }

        public bool CheckLogin(string email, string password)
        {
            using var connection = new NpgsqlConnection(_connectionString);

            try
            {
                connection.Open();

                using var command = new NpgsqlCommand("SELECT * FROM login_table WHERE email = @Email AND password = @Password", connection);
                Console.WriteLine(command);
                // Add parameters to the command
                command.Parameters.AddWithValue("Email", email);
                command.Parameters.AddWithValue("Password", password);

                using var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    Console.WriteLine("Login successful!");
                    Console.WriteLine($"{reader["id"]} - {reader["name"]} - {reader["email"]}");
                    return true;
                }
                else
                {
                    Console.WriteLine("Invalid credentials. Login failed.");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
            finally
            {
                connection.Close();
            }
        }

        public bool RegisterUser(string firstName, string lastName, string email, string password)
        {
            using var connection = new NpgsqlConnection(_connectionString);

            try
            {
                connection.Open();

                // Check and create the table if it doesn't exist
                CheckAndCreateTable();

                // Check if the email already exists
                if (IsEmailExists(email, connection))
                {
                    Console.WriteLine("Email already exists. Registration failed.");
                    return false;
                }

                // Proceed with the registration
                using var command = new NpgsqlCommand("INSERT INTO login_table (name, email, password) VALUES (@Name, @Email, @Password)", connection);

                // Add parameters to the command
                command.Parameters.AddWithValue("Name", $"{firstName} {lastName}");
                command.Parameters.AddWithValue("Email", email);
                command.Parameters.AddWithValue("Password", password);

                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    Console.WriteLine("User registered successfully!");
                    return true;
                }
                else
                {
                    Console.WriteLine("Failed to register user.");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            finally
            {
                connection.Close();
            }

            return false;
        }

        public bool ChangePassword(string email, string newPassword)
        {
            using var connection = new NpgsqlConnection(_connectionString);

            try
            {
                connection.Open();

                // Check if the email exists
                if (!IsEmailExists(email, connection))
                {
                    Console.WriteLine($"Email '{email}' not found. Password change failed.");
                    return false;
                }

                // Proceed with changing the password
                using var command = new NpgsqlCommand("UPDATE login_table SET password = @Password WHERE email = @Email", connection);

                // Add parameters to the command
                command.Parameters.AddWithValue("Email", email);
                command.Parameters.AddWithValue("Password", newPassword);

                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    Console.WriteLine("Password changed successfully!");
                    return true;
                }
                else
                {
                    Console.WriteLine("Failed to change password.");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            finally
            {
                connection.Close();
            }

            return false;
        }

        private bool IsEmailExists(string email, NpgsqlConnection connection)
        {
            using var command = new NpgsqlCommand("SELECT COUNT(*) FROM login_table WHERE email = @Email", connection);
            command.Parameters.AddWithValue("Email", email);

            var count = (long)command.ExecuteScalar();

            return count > 0;
        }


        private void CheckAndCreateTable()
        {
            using var connection = new NpgsqlConnection(_connectionString);

            try
            {
                connection.Open();

                using var command = new NpgsqlCommand(
                    "CREATE TABLE IF NOT EXISTS login_table (" +
                    "id SERIAL PRIMARY KEY," +
                    "name VARCHAR(100)," +
                    "email VARCHAR(100) UNIQUE," +
                    "password VARCHAR(100)" +
                    ")", connection);

                command.ExecuteNonQuery();

                Console.WriteLine("Table created or already exists.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            finally
            {
                connection.Close();
            }
        }

    }
}
