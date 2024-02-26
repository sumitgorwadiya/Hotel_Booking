import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';

const ConfirmPriceCard = ({roomData, differenceInDays, setPaidPrice}) => {
  const basePrice = +roomData?.price_per_night * +differenceInDays;
  const discount = 200;
  const afterDisPrice = basePrice - discount;
  const tax = afterDisPrice * 0.12;
  const totalPrice = afterDisPrice + tax;

  useEffect(() => {
    totalPrice && setPaidPrice(totalPrice);
  }, [totalPrice]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Summary</Text>
      <View style={styles.fdr_alc}>
        <Text style={styles.priceTitle}>Base Price</Text>
        <Text style={styles.priceText}>₹{basePrice}</Text>
      </View>
      <View style={styles.fdr_alc}>
        <Text style={styles.priceTitle}>Total Discount</Text>
        <Text style={styles.priceText}>₹{discount}</Text>
      </View>
      <View style={styles.fdr_alc}>
        <Text style={styles.priceTitle}>Price after Discount</Text>
        <Text style={styles.priceText}>₹{afterDisPrice}</Text>
      </View>
      <View style={styles.fdr_alc}>
        <Text style={styles.priceTitle}>
          Tax & Service fees <Text style={styles.smallText}>(12%)</Text>
        </Text>
        <Text style={styles.priceText}>₹{tax}</Text>
      </View>
      <View style={styles.fdr_alc}>
        <Text style={styles.priceTitle2}>Total Amount to be Paid</Text>
        <Text style={styles.priceText}>₹{totalPrice}</Text>
      </View>
    </View>
  );
};

export default ConfirmPriceCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: wp(5),
    width: wp(90),
    alignSelf: 'center',
  },
  title: {
    ...textStyle(5, Colors.black, 7),
  },
  priceTitle: {
    ...textStyle(4.5, Colors.gray, 5),
  },
  smallText: {
    ...textStyle(3, Colors.gray, 4),
  },
  priceTitle2: {
    ...textStyle(4.5, Colors.black, 6),
  },
  priceText: {
    ...textStyle(4, Colors.gray, 5),
  },
  fdr_alc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp(4),
    borderBottomColor: Colors.grayLight,
    borderBottomWidth: 0.7,
  },
});
