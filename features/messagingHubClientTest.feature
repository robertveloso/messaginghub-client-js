Feature: A MessagingHubClient
  As a developer
  I want to connect to a server
  So that I can send and receive messages

  Scenario: Should connect
    Given Exist a available connection with ws://messaginghub.io
    And I have a MessagingHubClient instance
    When Nian connect with password 'P@$$w0rD'
    Then Should be execute a callback function with undefined error
