@import "../../../styles";

.button {
  background-color: $gray;
  border: unset;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 8px;
  padding: 4px 8px;
}

.button:last-child {
  margin-right: unset;
}

.active {
  background-color: $green;
  color: $white;
}

.button:disabled {
  color: $dark-gray;
}

