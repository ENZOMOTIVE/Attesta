// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attestation {
    struct AttestationData {
        string name;
        string branch;
        string rollNumber;
        string registrationNumber;
        string mailId;
        string issueDate;
        string certificateImageHash;
    }

    mapping(address => AttestationData[]) public userAttestations;

    event AttestationCreated(
        address indexed user,
        string name,
        string branch,
        string rollNumber,
        string registrationNumber,
        string mailId,
        string issueDate,
        string certificateImageHash
    );

    function createAttestation(
        string memory _name,
        string memory _branch,
        string memory _rollNumber,
        string memory _registrationNumber,
        string memory _mailId,
        string memory _issueDate,
        string memory _certificateImageHash
    ) public {
        AttestationData memory newAttestation = AttestationData({
            name: _name,
            branch: _branch,
            rollNumber: _rollNumber,
            registrationNumber: _registrationNumber,
            mailId: _mailId,
            issueDate: _issueDate,
            certificateImageHash: _certificateImageHash
        });

        userAttestations[msg.sender].push(newAttestation);

        emit AttestationCreated(
            msg.sender,
            _name,
            _branch,
            _rollNumber,
            _registrationNumber,
            _mailId,
            _issueDate,
            _certificateImageHash
        );
    }
}
