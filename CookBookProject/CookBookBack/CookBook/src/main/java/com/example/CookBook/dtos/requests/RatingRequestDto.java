package com.example.CookBook.dtos.requests;

import com.example.CookBook.dtos.responses.UserDto;

public class RatingRequestDto {
    int value;
    UserDto userDto;
    String comment;

    public RatingRequestDto(int value, UserDto userDto, String comment) {
        this.value = value;
        this.userDto = userDto;
        this.comment = comment;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
