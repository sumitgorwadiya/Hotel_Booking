import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import CircleBtn from '../Buttons/CircleBtn';

const TravelerCard = ({
  gender,
  firstName,
  lastName,
  code,
  email,
  setGender,
  setFirstName,
  setLastName,
  setCode,
  setEmail,
  setPhoneNumber,
  phoneNumber,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travelers Details</Text>
      <Text style={styles.name}>Name</Text>
      <View style={styles.nameCardCont}>
        <CircleBtn
          text={'Mr.'}
          isActive={gender === 'Mr.'}
          onPress={() => setGender('Mr.')}
        />
        <CircleBtn
          text={'Mrs.'}
          isActive={gender === 'Mrs.'}
          onPress={() => setGender('Mrs.')}
        />
        <CircleBtn
          text={'Ms.'}
          isActive={gender === 'Ms.'}
          onPress={() => setGender('Ms.')}
        />
      </View>
      <View style={styles.fld}>
        <InputCard
          placeholder={'First Name'}
          otherStyle={{width: wp(43.5)}}
          value={firstName}
          setValue={setFirstName}
        />
        <InputCard
          placeholder={'Last Name'}
          otherStyle={{width: wp(43.5)}}
          value={lastName}
          setValue={setLastName}
        />
      </View>
      <Text style={styles.name}>Mobile No.</Text>
      <View style={styles.fld}>
        <InputCard
          // placeholder={'Code'}
          otherStyle={{width: wp(15)}}
          value={code}
          editable={false}
          // setValue={setCode}
        />
        <InputCard
          placeholder={'Phone Number'}
          otherStyle={{width: wp(72)}}
          value={phoneNumber}
          setValue={setPhoneNumber}
          keyboardType={'decimal-pad'}
        />
      </View>
      <Text style={styles.name}>Email Address</Text>
      <View style={styles.fld}>
        <InputCard
          otherStyle={{width: wp(90)}}
          placeholder={'Email'}
          value={email}
          setValue={setEmail}
          keyboardType={'decimal-pad'}
        />
      </View>
    </View>
  );
};

export default TravelerCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: wp(5),
    width: wp(90),
    alignSelf: 'center',
  },
  title: {
    ...textStyle(5, Colors.black, 7),
  },
  name: {
    ...textStyle(4.2, Colors.black, 6),
    marginTop: wp(6),
  },
  nameCardCont: {
    flexDirection: 'row',
    gap: wp(5),
    marginTop: wp(2),
  },
  inputCont: {
    borderWidth: wp(0.7),
    borderColor: Colors.grayLight,
    borderRadius: wp(2),
    marginTop: wp(2),
    alignItems: 'flex-start',
    paddingLeft: wp(2),
  },
  fld: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upText: {
    ...textStyle(2.7, Colors.orange, 5),
    position: 'absolute',
    backgroundColor: Colors.white,
    top: wp(-2.5),
    left: wp(2),
  },
  input: {
    ...textStyle(3.5, Colors.black, 5),
    width: '96%',
  },
});

const InputCard = ({
  value,
  setValue,
  placeholder,
  otherStyle,
  editable,
  keyboardType,
}) => {
  return (
    <View style={[styles.inputCont, otherStyle]}>
      <TextInput
        value={value}
        onChangeText={text => {
          setValue(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        style={styles.input}
        keyboardType={keyboardType}
        editable={editable}
      />
      {value && <Text style={styles.upText}>{placeholder}</Text>}
    </View>
  );
};
